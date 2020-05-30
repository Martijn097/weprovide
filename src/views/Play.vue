<template>
  <div class="play" v-cloak>
    <NewMessage :name="name" :jobs="jobs" />
    <li v-for="message in messages" :key="message.id">
      <span>{{ message.name }}</span>
      <span>{{ message.jobs }}</span>
      <span>{{ message.content }}</span>
      <span>{{ message.timestamp }}</span>
    </li>
    <transition name="fade">
    <div id="blocker" ref="blocker" v-show="!controlsEnabled">
			<div id="instructions" ref="instructions" @click="clickOnInstructions">
				<span style="font-size:40px">Click to play {{ this.name }} </span>
				<br />
				(W, A, S, D = Move, SPACE = Jump, MOUSE = Look aroundt)
			</div>
		</div>
    </transition>
    <div class="controls">
      <button @click="movePosition(5,5,0)">Move a</button>
      <button @click="movePosition(5,15,0)">Move b</button>
      <button @click="movePosition(15,5,0)">Move c</button>
    </div>
    <div class="container" ref="canvas">
      <div class="wrapper">
        <div class="left-down">
          <div class="map">
            <img src="~@/assets/img/facbook.svg" alt="Facebook_WeProvide">
          </div>
        </div>
        <div class="right-down">
          <div class="fullscreen">
            <img src="~@/assets/img/facbook.svg" alt="Facebook_WeProvide">
          </div>
          <div class="sound">
            <img src="~@/assets/img/speaker.svg" alt="Sound">
          </div>
        </div>
        <div class="center-down">
          <div class="mouse m-1"></div>
        </div>
        <div class="top-right">
          <div class="lock">
            <img src="~@/assets/img/lock.svg" alt="Lock">
          </div>
        </div>
        <div class="center">
          <div class="marker"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import PointerLockControls from 'three-pointerlock'
import CubeObject from './../views/CubeObject'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'

import { TimelineLite, TweenMax, Bounce, Power2, TweenLite  } from "gsap"
import { gsap, CSSPlugin } from 'gsap/all'
gsap.registerPlugin(CSSPlugin)

import NewMessage from '@/views/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'
import 'moment/locale/nl';

export default {
  name: 'Play',
  props: ['name', 'jobs'],
  components: {
    NewMessage
  },
  data () {
    return {
      messages: [],
      element: undefined,
      camera: undefined,
      scene: undefined,
      box: undefined,
      renderer: undefined,
      controls: undefined,
      objects: [],
      raycaster: undefined,
      blocker: undefined,
      instructions: undefined,
      havePointerLock: undefined,
      intersects: [],

      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      canJump: false,
      sprinting: false,
      moveY: 0,

      prevTime: undefined,
      velocity: undefined
    };
  },
  created(){
    let ref = db.collection('messages').orderBy('timestamp')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            jobs: doc.data().jobs,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('ll')
          })
        }
      })
    })
  },
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.set(0, 30, 0);
      console.log(this.camera.position);
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

      let light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
      light.position.set(0.5, 1, 0.75);
      this.scene.add(light);

      this.controls = new PointerLockControls(this.camera);
      this.scene.add(this.controls.getObject());

      document.addEventListener('wheel', this.onScrollWheel, false);

      document.addEventListener( 'keydown', this.onKeyDown, false );
      document.addEventListener( 'keyup', this.onKeyUp, false );

      this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

      // this.moveObjectA();

      this.initCreateGround();
      this.initCreateHouse();

      this.initCube();

      this.initRenderer();

      window.addEventListener('resize', this.onWindowResize, false);
    },
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.setClearColor(0x151515);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.element.appendChild(this.renderer.domElement);
    },
    initCreateGround () {
      const loader = new GLTFLoader()
      loader.load('/blender/grond.glb', gltf => {
          this.scene.add(gltf.scene)
          gltf.scene.position.set(0, 0, -100)
          gltf.scene.scale.set(10, 10, 10)
        },
        function (xhr) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
        }
      );
    },
    initCreateHouse () {
      const loader = new GLTFLoader()
      loader.load('/blender/room.glb', gltf => {
          this.scene.add(gltf.scene)
          // gltf.scene.rotation.y = 180
          gltf.scene.position.set(0, 15, 0)
          gltf.scene.scale.set(8, 8, 8)
        },
        function (xhr) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
        }
      );
    },
    initCube () {
      var cube = this.scene.getObjectByName("Cube");
      cube = new CubeObject(20, 20, 20)
        .create()
        .setPosition(10,10,10)
        
      let mesh = cube.mesh;

      this.scene.add(mesh);
      this.objects.push(mesh);
    },
    animate () {
      requestAnimationFrame(this.animate);
      if (this.controlsEnabled) {
        let time = performance.now();
        let delta = ( time - this.prevTime ) / 1000;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        this.handleInput (delta) 

        if ( this.controls.getObject().position.y < 10 ) {
          this.velocity.y = 0;
          this.controls.getObject().position.y = 10;
          this.canJump = true;
        }
        this.prevTime = time;
      }

      this.renderer.render( this.scene, this.camera );
    },
    handleInput (delta) {
      this.velocity.z += (this.moveY * 10.0 * delta)
      this.controls.getObject().position.z += this.velocity.z * delta;
      this.moveY = 0;

      // this.velocity.z += (this.zInput * 400.0 * delta) * (this.sprinting ? 2 : 1);
      // this.velocity.x += (this.xInput * 400.0 * delta);

      // if ( this.isOnObject() === true ) {
      //     this.velocity.y = Math.max( 0, this.velocity.y );
      //     this.canJump = true;
      // }

      // this.controls.getObject().translateX( this.velocity.x * delta );
      // this.controls.getObject().translateY( this.velocity.y * delta );
      // this.controls.getObject().translateZ( this.velocity.z * delta );
    },
    movePosition (x, y, z) {
      this.controls.getObject().position.x = x;
      this.controls.getObject().position.y = y;
      this.controls.getObject().position.z = z;
    },

    onKeyDown (event) {
      switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = true;
          break;
        case 37: // left
        case 65: // a
          this.moveLeft = true; 
          break;
        case 40: // down
        case 83: // s
          this.moveBackward = true;
          break;
        case 39: // right
        case 68: // d
          this.moveRight = true;
          break;
        case 32: // space
          if ( this.canJump === true ) {
              this.velocity.y += 350;
          }
          this.canJump = false;
          break;
        case 16:
          this.sprinting = true;
          break;
      }
    },
    onKeyUp (event) {
      switch( event.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = false;
          break;
        case 37: // left
        case 65: // a
          this.moveLeft = false;
          break;
        case 40: // down
        case 83: // s
          this.moveBackward = false;
          break;
        case 39: // right
        case 68: // d
          this.moveRight = false;
          break;
        case 16:
          this.sprinting = false;
          break;
      }
    },
    onScrollWheel (event) {
      let deltaY = event.deltaY;
      if (deltaY > 0) {
        this.moveY = 1;
      }
      if (deltaY < 0) {
        this.moveY = -1;
      }
      this.moveY = deltaY;
    },

    isOnObject () {
      this.raycaster.ray.origin.copy(this.controls.getObject().position);
      this.raycaster.ray.origin.y -= 10;

      let intersections = this.raycaster.intersectObjects(this.objects);
      return intersections.length > 0;
    },
    
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    pointerlockchange () {
      if ( document.pointerLockElement === this.element || document.mozPointerLockElement === this.element || document.webkitPointerLockElement === this.element ) {
        this.controls.enabled = true;
      } else {
        this.controls.enabled = false;
      }
    },
    pointerlockerror () {
        // this.instructions.style.display = '';
    },
    clickOnInstructions () {
      // this.instructions.style.display = 'none';

      this.element.requestPointerLock = this.element.requestPointerLock || this.element.mozRequestPointerLock || this.element.webkitRequestPointerLock;

      if (/Firefox/i.test(navigator.userAgent)) {
        document.addEventListener( 'fullscreenchange', this.fullscreenchange, false );
        document.addEventListener( 'mozfullscreenchange', this.fullscreenchange, false );
        this.element.requestFullscreen = this.element.requestFullscreen || this.element.mozRequestFullscreen || this.element.mozRequestFullScreen || this.element.webkitRequestFullscreen;
        this.element.requestFullscreen();
      } else {
        this.element.requestPointerLock();
      }
    },
    fullscreenchange () {
      if ( document.fullscreenElement === this.element || document.mozFullscreenElement === this.element || document.mozFullScreenElement === this.element ) {
        document.removeEventListener( 'fullscreenchange', this.fullscreenchange );
        document.removeEventListener( 'mozfullscreenchange', this.fullscreenchange );
        this.element.requestPointerLock();
      }
    }
  },
  computed: {
    controlsEnabled () {
      if (this.controls !== undefined) {
        return this.controls.enabled;
      }
      return false;
    },
    // aspectRatio () {
    //   return window.innerWidth / window.innerHeight;
    // },
    zInput () {
      let value = 0;
      value -= (this.moveForward ? 1 : 0);
      value += (this.moveBackward ? 1 : 0);
      return value;
    },
    xInput () {
      let value = 0;
      value -= (this.moveLeft ? 1 : 0);
      value += (this.moveRight ? 1 : 0);
      return value;
    },
    moveObjectA (){
      if (this.camera.position.z = 30){
        this.controls.getObject().position.y = y;
      } 
    }
  },
  mounted () {
    this.element = this.$refs.canvas;
    this.blocker = this.$refs.blocker;
    this.instructions = this.$refs.instructions;
    const timeline = new TimelineLite()

    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
      
    if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {
      document.addEventListener( 'pointerlockchange', this.pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', this.pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', this.pointerlockchange, false );
      document.addEventListener( 'pointerlockerror', this.pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', this.pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', this.pointerlockerror, false );

      this.init();
      this.animate();
    } else {
      this.instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }

    // if (this.controls.enabled = true){

    //   TweenLite.to(blocker, 1, {backgroundColor: red})

    //   timeline.to(blocker, 1, {
    //     delay: 4,
    //     backgroundColor:"red",
    //     ease: Power2.easeInOut 
    //   })
    // }
    


  }
}
</script>

<style lang="scss" scoped>
[v-cloak] > * {
  display: none;
}
[v-cloak]::before{
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear-infinite;
  animation: spin 2s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.play{
  width: 100%;
	height: 100%;
  background-color: #ffffff;
  margin: 0;
  overflow: hidden;
  li{
    color: black;
  }
  #blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,1);
    z-index: 2;
    transition: all 0.5s ease;
    #instructions {
      width: 100%;
      height: 100%;
      display: -webkit-flex;
      display: -moz-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
  }
  .controls {
    z-index: 1000;
    position: absolute;
    bottom: 0;
    left: 0;
    margin:0;
    padding: 0;
  }
  .container{
    .wrapper{
      margin: 40px;
      .left-down{
        position: fixed;
        bottom: 0;
        left: 0;
      }
      .right-down{
        position: fixed;
        bottom: 0;
        right: 0;
      }
      .top-right{
        position: fixed;
        top: 0;
        right: 0;
      }
      .center-down{
        position: fixed;
        bottom: 0;
        margin: auto;
        left: calc(50% - 20px);
        .mouse {
          bottom: 0;
          width: 40px;
          height: 60px;
          border-radius: 20px;
          border: 3px solid #EFD15B;
        }
        .mouse:before, .mouse:after {
          content: "";
          display: block;
          position: absolute;
        }
        /* Second */
        .m-1:before {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          top: 10px;
          left: calc(50% - 5px);
          background: #EFD15B;
          -webkit-animation: m-1-ball 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                  animation: m-1-ball 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      }
      .center{
        .marker{
          width:50px;
          height: 50px;
          // background: red;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          z-index: 1;
          display: flex;
          &:before, &:after{
            position: absolute;
            content: '';
          }
          &:before{
            /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#efd15b+0,efd15b+100&1+0,0+40,0+60,1+100 */
            background: -moz-linear-gradient(top,  rgba(239,209,91,1) 0%, rgba(239,209,91,0) 40%, rgba(239,209,91,0) 60%, rgba(239,209,91,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top,  rgba(239,209,91,1) 0%,rgba(239,209,91,0) 40%,rgba(239,209,91,0) 60%,rgba(239,209,91,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom,  rgba(239,209,91,1) 0%,rgba(239,209,91,0) 40%,rgba(239,209,91,0) 60%,rgba(239,209,91,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#efd15b', endColorstr='#efd15b',GradientType=0 ); /* IE6-9 */
            height: 50px;
            width: 2px;
            margin:auto;
            position:absolute;
            left:0;right:0;
          }
          &:after{
            width:50px;
            background: -moz-linear-gradient(left,  rgba(239,209,91,1) 0%, rgba(239,209,91,0) 40%, rgba(239,209,91,0) 60%, rgba(239,209,91,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left,  rgba(239,209,91,1) 0%,rgba(239,209,91,0) 40%,rgba(239,209,91,0) 60%,rgba(239,209,91,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right,  rgba(239,209,91,1) 0%,rgba(239,209,91,0) 40%,rgba(239,209,91,0) 60%,rgba(239,209,91,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#efd15b', endColorstr='#efd15b',GradientType=1 ); /* IE6-9 */
            height:2px;
            margin:auto;
            position:absolute;
            top:0;bottom:0;
          }
        }
      }
    } 
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



@-webkit-keyframes m-1-ball {
  0%, 65%, 100% {
    opacity: 0;
  }
  10%, 40% {
    opacity: 1;
  }
  0% {
    -webkit-transform: translateY(5px) scale(0.7);
            transform: translateY(5px) scale(0.7);
  }
  5% {
    -webkit-transform: scale(0.7);
            transform: scale(0.7);
  }
  15%, 100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45%, 65% {
    -webkit-transform: translateY(24px) scale(0.7);
            transform: translateY(24px) scale(0.7);
  }
}

@keyframes m-1-ball {
  0%, 65%, 100% {
    opacity: 0;
  }
  10%, 40% {
    opacity: 1;
  }
  0% {
    -webkit-transform: translateY(5px) scale(0.7);
            transform: translateY(5px) scale(0.7);
  }
  5% {
    -webkit-transform: scale(0.7);
            transform: scale(0.7);
  }
  15%, 100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45%, 65% {
    -webkit-transform: translateY(24px) scale(0.7);
            transform: translateY(24px) scale(0.7);
  }
}
</style>