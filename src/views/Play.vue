<template>
  <div class="play">
    <audio ref="audioElm" src="/blender/music.mp3" loop></audio>
    <section id="loading-screen">
      <div id="loader"></div>
      <div class="lock">
        <img src="@/assets/img/lock.png" alt="lock">
        <h4>Loading</h4>
      </div>
    </section>

    <transition name="fade">
    <div id="blocker" ref="blocker" v-show="!controlsEnabled" >

      <div class="popup-wrapper">
        <button class="click-on-close" @click="clickOnClose">close</button>
        <div class="popup">
          <div class="popup-text">
            <p>Ga op zoek naar een kaartje. Dit kaartje brengt je een stap verder</p>
          </div>
        </div>
      </div>

      <div class="popup-card-wrapper">
        <button class="click-on-close" @click="clickOnClose">close</button>
        <div class="popup-card">
          <img src="@/assets/img/card.png" alt="card">
        </div>
      </div>

      <div class="popup-laptop-wrapper">
        <button class="click-on-close" @click="clickOnClose">close</button>
        <div class="popup-laptop">
          <div class="laptop">
            <div class="screen">
              <div class="signature">
                <div class="black">
                  <div class="laptop-login">
                    <h2>Vul het wachtwoord in</h2>
                    <p>{{ laptopPassword }}</p>
                    <p class="false">fout</p>
                  </div>
                  <div class="laptop-login-true">
                    <h2>De code</h2>
                    <p class="true">4294</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="keyboard"></div>
          </div>
          <div class="field">
            <input class="input-label" type="text" placeholder="typ hier" v-model='laptopPassword'>
          </div>
          <div @click="laptopEnter" class="laptop-btn">enter</div>
        </div>
      </div>

      <div class="popup-lock-wrapper">
        <button class="click-on-close" @click="clickOnClose">close</button>
        <div class="popup-lock">
          <NewMessage :name="name" :jobs="jobs" v-model='lockCode'/>
        </div>
      </div>

			<div id="instructions" ref="instructions">
				<span>Escape Room</span>
        <h4>Menu</h4>
			</div>
       <div class="wrapper">
        <!-- <div class="map">
          <div class="btn-gradient"></div>
          <img src="~@/assets/img/map.svg" alt="Map">
        </div> -->
        <div @click="openFullscreen" class="fullscreen">
          <div class="btn-gradient"></div>
          <img v-bind:style="styleObjectFullscreenOn" class="fullscreen-on" src="~@/assets/img/fullscreen.svg" alt="Fullscreen">
          <img v-bind:style="styleObjectFullscreenOff" class="fullscreen-off" src="~@/assets/img/minimize.svg" alt="Minimize">
        </div>
        <div v-on:click="playPause" class="sound">
          <div class="btn-gradient"></div>
          <img v-bind:style="styleObjectSoundOn" class="sound-on" src="~@/assets/img/speaker.svg" alt="Sound">
          <img v-bind:style="styleObjectSoundOff" class="sound-off" src="~@/assets/img/sound_off.png" alt="Sound Off">
        </div>
        <!-- <div class="lock">
          <div class="btn-gradient"></div>
          <img src="~@/assets/img/lock.svg" alt="Lock">
        </div> -->
      </div>
      <div @click="clickOnInstructions" class="start-button">
        <div class="left-bracket"></div>
        <div class="start-button-label">CONTINUE</div>
        <div class="right-bracket"></div>
        <div class="button-gradient"></div>
      </div>
		</div>
    </transition>
    <!-- <div class="controls">
      <button @click="movePosition(5,5,0)">Move a</button>
      <button @click="movePosition(5,15,0)">Move b</button>
      <button @click="movePosition(15,5,0)">Move c</button>
    </div> -->
    <div class="container" ref="canvas">
      <div class="center">
        <div class="marker"></div>
        <div class="center-down">
          <div class="w">w</div>
          <div class="under">
            <div class="a">a</div>
            <div class="s">s</div>
            <div class="d">d</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import PointerLockControls from 'three-pointerlock'
import CubeObject from './../views/CubeObject'
import WallObject from './../views/WallObject'
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
      texture: undefined,
      renderer: undefined,
      controls: undefined,
      objects: [],
      raycaster: undefined,
      playerspeed: undefined,
      playercollisiondistance: undefined,
      playerVelocity: undefined,
      blocker: undefined,
      instructions: undefined,
      havePointerLock: undefined,
      intersects: [],
      loadingScreen: undefined,
      loadingManager: null,
      elem: null,
      laptopPassword: undefined,
      lockCode: undefined,
      popup: undefined,
      cube: undefined,
      wall: undefined,
      mouse: undefined,
      group: undefined,
      laptop: [],
      paper: [],
      card: [],
      lock: [],
      walls: [],
      wallMesh: [],
      cubeMesh: [],
      INTERSECTED: null,
      track: document.getElementById('track'),
      controlBtn: document.getElementById('play-pause'),
      styleObjectSoundOn: {
        display: 'none'
      },
      styleObjectSoundOff: {
        display: 'block'
      },
      styleObjectFullscreenOn: {
        display: 'block'
      },
      styleObjectFullscreenOff: {
        display: 'none'
      },

      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
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
      // Setup camera
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.set(0, 30, 0);

      // Setup scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

      // Setup light
      let light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
      light.position.set(0.5, 1, 0.75);
      this.scene.add(light);

      // Setup controls
      this.controls = new PointerLockControls(this.camera);
      this.scene.add(this.controls.getObject());

      // Add eventlisteners movement
      document.addEventListener( 'keydown', this.onKeyDown, false );
      document.addEventListener( 'keyup', this.onKeyUp, false );
      // If you want to use mousewheel instead of keys
      // document.addEventListener('wheel', this.onScrollWheel, false);

      // Add eventlistener click interaction 3D object
      document.addEventListener('mousedown', this.onDocumentMouseDown, false);
      document.addEventListener('mousedown', this.onDocumentMouseDownCard, false);
      document.addEventListener('mousedown', this.onDocumentMouseDownLaptop, false);
      document.addEventListener('mousedown', this.onDocumentMouseDownLock, false);
      window.addEventListener( 'mousemove', this.onMouseMove, false );

      // Add eventlisteren responsive
      window.addEventListener('resize', this.onWindowResize, false);

      //  Mouse interaction for raycaster
      this.mouse ={x: 0, y: 0}
      
      // Setup raycaster
      this.raycaster = new THREE.Raycaster();
      
      // Setup loading manager
      this.loadingManager = new THREE.LoadingManager( () => {
        // if loaded fade out loading screen
        this.loadingScreen = document.getElementById( 'loading-screen' );
        this.loadingScreen.classList.add( 'fade-out' );
        // removing loadingscreen from DOM
        this.loadingScreen.addEventListener( 'transitionend', this.onTransitionEnd );
      } );

      // this.moveObjectA();

      // initialise 3D Objects
      this.initCreateRoom();
      this.initCreatePaper();
      this.initCreateCard();
      this.initCreateBox();
      this.initCreateLaptop();
      this.initCreateLock();
      this.initWallNorth();
      this.initWallSouth();
      this.initWallWest();
      this.initWallEast();

      // Render to the scene
      this.initRenderer();
    },
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.setClearColor(0x151515);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.element.appendChild(this.renderer.domElement);
    },
    initCreateRoom () {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load('/blender/escape_room.glb', gltf => {
          this.scene.add(gltf.scene)
          gltf.scene.position.set(0, 15, -50)
          gltf.scene.scale.set(8, 8, 8)
          gltf.scene.rotation.y = -1.5708
          this.texture.minFilter = THREE.LinearFilter;
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
    initCreatePaper () {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load('/blender/paper.glb', gltf => {
          gltf.scene.position.set(10, 11, -80)
          gltf.scene.scale.set(5, 5, 5)
          this.paper.push(gltf.scene);
          this.scene.add(gltf.scene);
        },
      );
    },
    initCreateCard () {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load('/blender/card.glb', gltf => {
          gltf.scene.position.set(-38.5, 2, -132)
          gltf.scene.scale.set(1, 1, 1)
          this.card.push(gltf.scene);
          this.scene.add(gltf.scene);
        },
      );
    },
    initCreateBox () {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load('/blender/wood_box.glb', gltf => {
          gltf.scene.position.set(140, 10, 30)
          gltf.scene.scale.set(8, 8, 8)
          this.scene.add(gltf.scene);
        },
      );
    },
    initCreateLaptop () {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load('/blender/laptop.glb', gltf => {
          gltf.scene.position.set(138, 18, 28)
          gltf.scene.scale.set(2.5, 2.5, 2.5)
          gltf.scene.rotation.y = 4.10152
          this.laptop.push(gltf.scene);
          this.scene.add(gltf.scene);
        },
      );
    },
    initCreateLock () {
      const loader = new GLTFLoader(this.loadingManager)
      loader.load('/blender/lockfordoor.glb', gltf => {
          gltf.scene.position.set(-84, 10, -8.5)
          gltf.scene.scale.set(8, 8, 8)
          gltf.scene.rotation.y = 1.5708
          this.lock.push(gltf.scene);
          this.scene.add(gltf.scene);
        },
      );
    },
    initWallNorth () {
      this.group = new THREE.Group();
      this.wall = this.scene.getObjectByName("Wall");
      this.wall = new WallObject(10, 100, 300)
        .create()
        .setPosition(-100,10, -20)
      
      this.wallMesh = this.wall.wallMesh;
      this.group.add(this.wallMesh);
      this.walls.push(this.group);
      this.scene.add(this.group);
    },
    initWallSouth () {
      this.wall = this.scene.getObjectByName("Wall");
      this.wall = new WallObject(10, 100, 300)
        .create()
        .setPosition(160,10,-20)
        
      this.wallMesh = this.wall.wallMesh;
      this.group.add(this.wallMesh);
      this.walls.push(this.group);
      this.scene.add(this.group);
    },
    initWallWest () {
      this.wall = this.scene.getObjectByName("Wall");
      this.wall = new WallObject(300, 100, 10)
        .create()
        .setPosition(20,10,-160)
        
      this.wallMesh = this.wall.wallMesh;
      this.group.add(this.wallMesh);
      this.walls.push(this.group);
      this.scene.add(this.group);
    },
    initWallEast () {
      this.wall = this.scene.getObjectByName("Wall");
      this.wall = new WallObject(300, 100, 10)
        .create()
        .setPosition(20,10,62)
        
      this.wallMesh = this.wall.wallMesh;
      this.group.add(this.wallMesh);
      this.walls.push(this.group);
      this.scene.add(this.group);
    },
    onDocumentMouseDown (){
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects(this.paper, true);

      if (intersects.length > 0) {
        // intersects[0].object.material.color.setHex(Math.random() * 0xdec67a);
        this.popup = document.querySelector(".popup-wrapper"); // Element into which appending will be done
        this.popup.style.display = 'flex'; // show
        document.exitPointerLock();
      }
    },
    onDocumentMouseDownCard (){
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects(this.card, true);

      if (intersects.length > 0) {
        this.popup = document.querySelector(".popup-card-wrapper");
        this.popup.style.display = 'flex'; // show
        document.exitPointerLock();
      }
    },
    onDocumentMouseDownLaptop (){
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects(this.laptop, true);

      if (intersects.length > 0) {
        // intersects[0].object.material.color.setHex(Math.random() * 0xdec67a);
        this.popup = document.querySelector(".popup-laptop-wrapper"); // Element into which appending will be done
        this.popup.style.display = 'flex'; // show
        document.exitPointerLock();
      }
    },
    onDocumentMouseDownLock (){
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects(this.lock, true);

      if (intersects.length > 0) {
        // intersects[0].object.material.color.setHex(Math.random() * 0xdec67a);
        this.popup = document.querySelector(".popup-lock-wrapper"); // Element into which appending will be done
        this.popup.style.display = 'flex'; // show
        document.exitPointerLock();
      }
    },
    onMouseMove (){
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects(this.paper, true);

      // intersects[0].object.material.color.setHex(0xdec67a);

      if (intersects.length > 0) {
        if ( this.INTERSECTED != intersects[ 0 ].object ) {
          if ( this.INTERSECTED ) this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
          this.INTERSECTED = intersects[ 0 ].object;
          this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
          this.INTERSECTED.material.color.setHex( 0xdec67a );
        }
      } else {
        if ( this.INTERSECTED ) this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = null;
      }
    },
    laptopEnter(){
      if (this.laptopPassword === 'git') {
        this.laptopLogin = document.querySelector(".laptop-login"); // Element into which appending will be done
        this.laptopLogin.style.display = 'none'; // hide
        this.laptopLoginInput = document.querySelector(".field"); // Element into which appending will be done
        this.laptopLoginInput.style.display = 'none'; // hide
        this.laptopLoginBtn = document.querySelector(".laptop-btn"); // Element into which appending will be done
        this.laptopLoginBtn.style.display = 'none'; // hide
        this.laptopLoginTrue = document.querySelector(".laptop-login-true"); // Element into which appending will be done
        this.laptopLoginTrue.style.display = 'block'; // hide
      } else {
        this.laptopLoginFalse = document.querySelector(".false"); // Element into which appending will be done
        this.laptopLoginFalse.style.display = 'block'; // hide
      }
    },
    clickOnClose(){
      setTimeout(() => { 
        this.popup.style.display = 'none'; // hide
      }, 1000);
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
    animatePlayer(delta){
      // Gradual slowdown
      this.playerspeed = 2000.0;
      this.playerVelocity = new THREE.Vector3();
      this.playerVelocity.x -= this.playerVelocity.x * 10.0 * delta;
      this.playerVelocity.z -= this.playerVelocity.z * 10.0 * delta;

      // Mousewheel interaction
      // this.playerVelocity.z += (this.moveY * 10.0 * delta)
      // this.controls.getObject().position.z += this.playerVelocity.z * delta;
      // this.moveY = 0;

      // If no collision and a movement key is being pressed, apply movement velocity
      if (this.detectPlayerCollision() == false) {
        if (this.moveForward) {
          this.playerVelocity.z -= this.playerspeed * delta;
        }
        if (this.moveBackward) {
          this.playerVelocity.z += this.playerspeed * delta;
        } 
        if (this.moveLeft) {
          this.playerVelocity.x -= this.playerspeed * delta;
        }
        if (this.moveRight) {
          this.playerVelocity.x += this.playerspeed * delta;
        }

        this.controls.getObject().translateX(this.playerVelocity.x * delta);
        this.controls.getObject().translateZ(this.playerVelocity.z * delta);
      } else {
        // Collision or no movement key being pressed. Stop movememnt
        this.playerVelocity.x = 0;
        this.playerVelocity.z = 0;
      }
    },
    detectPlayerCollision(){
      // The rotation matrix to apply to our direction vector
      // Undefined by default to indicate ray should coming from front
      var rotationMatrix;
      // How many units away the player can get from the wall
      this.playercollisiondistance = 40; 
      // Get direction of camera
      var cameraDirection = this.controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();

      // Check which direction we're moving (not looking)
      // Flip matrix to that direction so that we can reposition the ray
      if (this.moveBackward) {
          rotationMatrix = new THREE.Matrix4();
          rotationMatrix.makeRotationY(this.degreesToRadians(180));
      }
      else if (this.moveLeft) {
          rotationMatrix = new THREE.Matrix4();
          rotationMatrix.makeRotationY(this.degreesToRadians(90));
      }
      else if (this.moveRight) {
          rotationMatrix = new THREE.Matrix4();
          rotationMatrix.makeRotationY(this.degreesToRadians(270));
      }

      // Player is moving forward, no rotation matrix needed
      if (rotationMatrix !== undefined) {
          cameraDirection.applyMatrix4(rotationMatrix);
      }

      // Apply ray to player camera
      var playerRaycaster = new THREE.Raycaster(this.controls.getObject().position, cameraDirection);

      // If our ray hit a collidable object, return true
      if (this.rayIntersect(playerRaycaster, this.playercollisiondistance)) {
          return true;
      } else {
          return false;
      }
    },
    rayIntersect(ray, distance) {
      var intersectWall = ray.intersectObjects(this.walls, true);
      for (var i = 0; i < intersectWall.length; i++) {
        if (intersectWall[i].distance < distance) {
            return true;
        }
      }
      return false;
    },
    // Converts degrees to radians
    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    },
    // Converts radians to degrees
    radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
    },
    animate () {
      requestAnimationFrame(this.animate);
      if (this.controlsEnabled) {
        let time = performance.now();
        let delta = ( time - this.prevTime ) / 1000;

        this.animatePlayer (delta) ;

        this.prevTime = time;
      } else {
        // Prevent Player from continuing if esc and move at the same time
        this.velocity.x = 0;
        this.velocity.z = 0;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveY = false;
      }

      this.renderer.render( this.scene, this.camera );
    },
    onTransitionEnd( event ) {
      event.target.remove();
    },
    movePosition (x, y, z) {
      this.controls.getObject().position.x = x;
      this.controls.getObject().position.y = y;
      this.controls.getObject().position.z = z;
    },
    onKeyDown (event) {
      switch ( event.keyCode ) {
        case 27: 
          this.moveForward = false;
          this.moveBackward = false;
          this.moveLeft = false;
          this.moveRight = false;
          break
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
        console.log('controls aan');
        // styling fullscreen button
        this.styleObjectFullscreenOn.display = 'none';
        this.styleObjectFullscreenOff.display = 'block';
      } else {
        this.controls.enabled = false;
        console.log('controls uit');
        // styling fullscreen button 
        this.styleObjectFullscreenOn.display = 'block';
        this.styleObjectFullscreenOff.display = 'none';
      }
    },
    pointerlockerror () {
        this.instructions.style.display = '';
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
    },
    openFullscreen (){
      this.elem = document.documentElement;
      this.styleObjectFullscreenOn.display = 'none'
      this.styleObjectFullscreenOff.display = 'block'
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  
                  // document.addEventListener( 'fullscreenchange', this.openFullscreen, false );
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();       
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        this.styleObjectFullscreenOn.display = 'block'
        this.styleObjectFullscreenOff.display = 'none'
        if (document.exitFullscreen) {
          // document.removeEventListener( 'fullscreenchange', this.openFullscreen );
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    playPause () {
      var a = this.$refs.audioElm;
      if (a.paused) {
        a.play();     
        this.styleObjectSoundOn.display = 'block'
        this.styleObjectSoundOff.display = 'none'
      } else {
        a.pause();
        this.styleObjectSoundOn.display = 'none'
        this.styleObjectSoundOff.display = 'block'
      }
    },
  },
  computed: {
    controlsEnabled () {
      if (this.controls !== undefined) {
        return this.controls.enabled;
      }
      return false;
    },
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
  }
}
</script>

<style lang="scss" scoped>
.click-on-close{
  cursor: pointer;
  position: absolute;
  display: inline-block;
  padding: 10px 60px;
  height: 50px;
  box-sizing: border-box;
  width: auto;
  color: black;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bolder;
  font-family: futura;
  background-color: white;
  transition: opacity 0.3s;
  border: none;
  right: 20px;
  bottom: 20px;
  &:hover{
    opacity: 0.7;
  }
}
canvas{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.play{
  width: 100%;
	height: 100%;
  background-color: #ffffff;
  margin: 0;
  overflow: hidden;
  .popup-wrapper{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    display: none;
    .popup{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55%;
      height: 70%;
      background: #fafafa;
      box-shadow: 0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px rgba(222,198,122,0.7) inset;
      padding: 24px;
      position: relative;
      &:before, &:after{
        content: "";
        background: #fafafa;
        box-shadow: 0 0 8px rgba(0,0,0,0.2), inset 0 0 300px rgba(222,198,122,0.7);
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -2;
        transition: .5s;
      }
      &:before{
        left: -5px;
        top: 2px;  
        transform: rotate(-1.5deg);
      }
      &:after{
        right: -3px;
        top: 0px;
        transform: rotate(2.4deg);
      }
      &:hover:before{
        transform: rotate(0deg);
        border: solid rgba(111,99,61,0.4);
        border-width: 0px 0px 0px 1px;
        left: -6px;
        top: -6px; 
      }
      &:hover:after{
        transform: rotate(0deg);
        border: solid rgba(111,99,61,0.4);
        border-width: 0px 0px 0px 1px;
        right: 3px;
        top: -3px;
      }
      .popup-text{
        color: black;
        font-family: Futura;
        text-transform: uppercase;
        font-size: 40px;
        font-weight: bolder;
      }
    }
  }
  .popup-card-wrapper{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    display: none;
    .popup-card{
      width: 60%;
      position: relative;
      img{
        width: 100%; 
      }
    }
  }
  .popup-laptop-wrapper{
    background-color: black;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    display: none;
    .popup-laptop{
      width: 60%;
      position: relative;
      .laptop {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        font-family: futura;
        font-weight: bolder;
        text-transform: uppercase;
        margin-bottom: 40px;
        .screen {
          width: 80%;
          padding: 5.5% 10%;
          margin: 0 10%;
          background: #000000;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
          box-shadow: 0 0 0 2px #acabb1;
          .signature {	
            position: relative;
            .black{
              width: 100%;
              height: 300px;
              background-color:black;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              .laptop-login{
                display: block;
                .false{
                  display: none;
                  color: red;
                }
                h2{
                  text-align: center;
                  color: white;
                }
              }
              .laptop-login-true{
                display: none;
                .true{
                  font-size: 40px;
                  color: lime;
                }
                h2{
                  text-align: center;
                  color: white;
                }
              }
            }
          }
        }
        .keyboard {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #7e7d83;
          height: 5%;
          border-radius: 0 0 100% 100%;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: #acabb1;
          }
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 40%;
            right: 40%;
            height: 50%;
            background: #cac9cf;
          }
        }
      }
      .field{
        display: block;
        text-align: left;
        margin-bottom: 20px;
        .input-label{
          font-family: Futura;
          text-transform: uppercase;
          padding-left: 35px;
          color: white;
          position: relative;
          background-color: transparent;
          display: block;
          width: 100%;
          font-size: 20px;
          line-height: 50px;
          border-top-width: initial;
          border-right-width: initial;
          border-left-width: initial;
          border-top-color: initial;
          border-right-color: initial;
          border-left-color: initial;
          outline: none;
          border-radius: 0px;
          border-style: none none solid;
          border-image: initial;
          border-bottom: 2px solid white;
          transition: all 0.25s ease 0s;
          &:focus{
            color: white;
            transition: all 0.5s ease 0s;
          }
        }      
        &:before{
          content: url("~@/assets/img/edit.png");
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          margin-top: 14px;
        }
      } 
      .laptop-btn{
        cursor: pointer;
        position: relative;
        display: inline-block;
        padding: 10px 60px;
        height: 50px;
        box-sizing: border-box;
        width: auto;
        color: black;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: bolder;
        font-family: futura;
        background-color:white;
        transition: opacity 0.3s;
        &:hover{
          opacity: 0.7;
        }
      }
    }
  }
  .popup-lock-wrapper{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: black;
    z-index: 2;
    display: none;
    .popup-lock{
      width: 60%;
      position: relative;
    }
  }
  #loading-screen {
    position: absolute;
    z-index: 16;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 1;
    transition: 1s opacity;
    .lock{
      position: absolute;
      z-index: 16;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      opacity: 1;
      transition: 1s opacity;
      -webkit-animation:grow 4s infinite;
      h4{
        margin: 0;
        padding: 0;
        margin-top: 10px;
        font-weight: bolder;
        font-size: 20px;
        letter-spacing: 1px;
        color: #EFD15B;
        font-family: Futura;
        text-transform: uppercase;
      }
      img{
        width: 50px;
      }
    }
    #loader {
      display: block;
      position: relative;
      top: 0;
      left: 0;
      background: linear-gradient(90deg,black,#EFD15B,  #EFD15B,#EFD15B, black);
      background-size: 400% 100%;
      width: 400%;
      height: 10px;
      background-repeat: no-repeat;
      -webkit-animation: AnimationName 5s ease infinite;
      -moz-animation: AnimationName 5s ease infinite;
      animation: AnimationName 5s ease infinite;
    }
  }
  #loading-screen.fade-out {
    opacity: 0;
  }
  li{
    color: black;
  }
  #blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    z-index: 2;
    transition: all 0.5s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    #instructions {
      display: -webkit-flex;
      display: -moz-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #ffffff;
      text-align: center;
      span{
        font-family: Diner, sans-serif;
        font-size: 120px;
        letter-spacing: 4px;
        line-height: 1;
        color: #EFD15B;
      }
      h4{
        margin: 0;
        padding: 0;
        font-weight: bolder;
        font-size: 20px;
        letter-spacing: 1px;
        color: #EFD15B;
        font-family: Futura;
        text-transform: uppercase;
      }
    }
    .wrapper{
      margin-top: 40px;
      margin-bottom: 40px;
      display: flex;
      .map{
        margin: 20px;
        position: relative;
        width: 62px;
        height: 62px;
        background: url("~@/assets/img/border.png");
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover .btn-gradient{
          opacity: 1;
        }
        .btn-gradient{
          position: absolute;
          top: 0;
          left: 0;
          width: 62px;
          height: calc(100% - 0px);
          border: 2px solid;
          -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          opacity: 0;
          transition: opacity .3s ease-out;
        }
        img{
          height: 25px;
        }
      }
      .fullscreen{
        margin: 20px;
        position: relative;
        width: 62px;
        height: 62px;
        background: url("~@/assets/img/border.png");
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover .btn-gradient{
          opacity: 1;
        }
        .fullscreen-on{
          display: block;
        }
        .fullscreen-off{
          display: none;
        }
        .btn-gradient{
          position: absolute;
          top: 0;
          left: 0;
          width: 62px;
          height: calc(100% - 0px);
          border: 2px solid;
          -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          opacity: 0;
          transition: opacity .3s ease-out;
        }
      }
      .sound{
        margin: 20px;
        position: relative;
        width: 62px;
        height: 62px;
        background: url("~@/assets/img/border.png");
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover .btn-gradient{
          opacity: 1;
        }
        .sound-on{
          display: none;
        }
        .sound-off{
          display: block;
          width: 40px;
        }
        .btn-gradient{
          position: absolute;
          top: 0;
          left: 0;
          width: 62px;
          height: calc(100% - 0px);
          border: 2px solid;
          -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          opacity: 0;
          transition: opacity .3s ease-out;
        }
      }
      .lock{
        margin: 20px;
        position: relative;
        width: 62px;
        height: 62px;
        background: url("~@/assets/img/border.png");
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover .btn-gradient{
          opacity: 1;
        }
        .btn-gradient{
          position: absolute;
          top: 0;
          left: 0;
          width: 62px;
          height: calc(100% - 0px);
          border: 2px solid;
          -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          opacity: 0;
          transition: opacity .3s ease-out;
        }
      }
    }
    .start-button{
      cursor: pointer;
      position: relative;
      display: inline-block;
      height: 50px;
      box-sizing: border-box;
      text-align: left;
      &:hover .start-button-label{
        color: white;
      }
      &:hover .button-gradient{
        opacity: 1;
      }
      .left-bracket{
        background: url("~@/assets/bracket2.png");
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        display: inline-block;
        width: 22px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .start-button-label{
        position: relative;
        top: -18px;
        display: inline-block;
        color: #EFD15B;
        font-size: 20px;
        letter-spacing: 2px;
        width: 200px;
        text-align: center;
        line-height: 50px;
        height: 100%;
        transition: color .3s ease-out;
      }
      .right-bracket{
        background: url("~@/assets/bracket2.png");
        display: inline-block;
        width: 22px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .button-gradient{
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 2px;
        width: 241px;
        height: calc(100% - 0px);
        border: 2px solid;
        -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
        border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
        opacity: 0;
        transition: opacity .3s ease-out;
      }
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
    .center{
      .center-down{
        position: absolute;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bolder;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        .w{
          width: 58px;
          padding: 10px;
          border: 2px solid #EFD15B;
          margin: auto;
          margin-bottom: 5px;
        }
        .under{
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          .a{
            width: 58px;
            padding: 10px;
            margin: 5px;
            border: 2px solid #EFD15B;
          }
          .s{
            width: 58px;
            padding: 10px;
            margin: 5px;
            border: 2px solid #EFD15B;
          }
          .d{
            width: 58px;
            padding: 10px;
            margin: 5px;
            border: 2px solid #EFD15B;
          }
        }
      }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// keyframes
@-webkit-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:125% 50%}
  100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:125% 50%}
  100%{background-position:0% 50%}
}
@keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:125% 50%}
  100%{background-position:0% 50%}
}
@-webkit-keyframes grow {
  0% {-webkit-transform: scale( 0.8 );-moz-transform: scale( 0.8 );-o-transform: scale( 0.8 );-ms-transform: scale( 0.8 );transform: scale( 0.8 );}
  50% {-webkit-transform: scale( 1 );-moz-transform: scale( 1 );-o-transform: scale( 1 );-ms-transform: scale( 1 );transform: scale( 1 );}
  100% {-webkit-transform: scale( 0.8 );-moz-transform: scale( 0.8 );-o-transform: scale( 0.8 );-ms-transform: scale( 0.8 );transform: scale( 0.8 );}
}
</style>