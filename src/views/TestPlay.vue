<template>
  <div class="TestPlay">
    <div id="div1" class="page-wrapper" ></div>
    <div id="scene-container" ref="sceneContainer"></div>
</div>

</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'

import { gsap, CSSPlugin } from 'gsap/all'
import { TimelineMax, Back, Power3, Power2 } from "gsap"
gsap.registerPlugin(CSSPlugin)

export default {
  name: 'TestPlay',
  data () {
    return {
      container: null,
      scene: null,
      camera: null, 
      controls: null, 
      renderer: null, 
      stats: null,
      gridHelper: null,
      mesh: null,
      flyControls: null,
    };
  },
  methods: {
    init () {
      // set container
      this.container = this.$refs.sceneContainer

      // add stats
      this.stats = new Stats()
      this.container.appendChild(this.stats.dom)

      // add camera
      const fov = 40 // Field of view
      const aspect = window.innerWidth / window.innerHeight
      const near = 0.2 // the near clipping plane
      const far = 25000 // the far clipping plane
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(0, 2, 10)
      this.camera = camera

      // create scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x140b33)

      // add lights
      const ambientLight = new THREE.HemisphereLight(
        0xffffff, // bright sky color
        0x222222, // dim ground color
        1 // intensity
      )
      const mainLight = new THREE.DirectionalLight(0xffffff, 1, 4000)
      mainLight.position.set(50, 0, 0)
      this.scene.add(ambientLight, mainLight)

      // create grid
      const gridHelper = new THREE.GridHelper(40, 40);
      this.scene.add(gridHelper);

      // create renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.gammaFactor = 2.2
      this.renderer.outputEncoding = THREE.sRGBEncoding
      this.renderer.physicallyCorrectLights = true
      this.container.appendChild(this.renderer.domElement)

      // set aspect ratio to match the new browser window aspect ratio
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)

      // eventlisteners
      window.addEventListener("scroll", this.updateCamera);
      window.addEventListener('resize', this.onWindowResize, false);
      document.addEventListener('mousemove', this.onMouseMove, false);

      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshNormalMaterial();

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      // object
      const loader = new GLTFLoader()
      loader.load(
        '/blender/test2.gltf',
        gltf => {
          this.scene.add(gltf.scene)
          gltf.scene.scale.set(1,1,1)
        },
        undefined,
        undefined
      )
      this.renderer.setAnimationLoop(() => {
        this.render()
      })
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.updateProjectionMatrix();
    },

    onMouseMove(event) {
      console.log(event.clientX);
      console.log(event.clientY);
      const mouseX = event.clientX - window.innerWidth / 2;
      const mouseY = event.clientY - window.innerHeight / 2;
      this.camera.position.x += (mouseX - this.camera.position.x) * 0.001;
      this.camera.position.y += (mouseY - this.camera.position.y) * 0.001;
      this.camera.lookAt(this.scene.position);
    },

    animate () {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.render();
    },

    updateCamera(ev) {
      let div1 = document.getElementById("div1");

        var scrollAmt = document.documentElement.scrollTop;
        if(scrollAmt < 800) {
          this.camera.position.z = 10 + window.scrollY / -400.0;
          this.camera.position.x = 0 + window.scrollY / -400.0;
        }
        else	{
          this.camera.position.z = 10 + window.scrollY / -400.0;
        }
    },

    // render
    render () {
      this.renderer.render(this.scene, this.camera);
      this.stats.update();
    }
  },
  mounted() {
    this.init();
    this.animate();


  }
}
</script>

<style lang="scss" scoped>
#scene-container {
  height: 100vh;
  width: 100vw; 
  position: fixed;
  canvas{
    height: 100vh;
    width: 100vw; 
  }
}
.page-wrapper {
  height: 400vh;
	padding: 0px;
	margin: 12px 48px;
	position: absolute;
	left: 0;
	top: 0;
	width: calc(100% - 2*48px);
	word-wrap: break-word;
}

.renderer_label {
  position: absolute;
  bottom: 1em;
  width: 100%;
  color: white;
  z-index: 10;
  display: block;
  text-align: center;
}

#container {
  display: flex;
}

#container_normal {
  width: 50%;
  display: inline-block;
  position: relative;
}

#container_logzbuf {
  width: 50%;
  display: inline-block;
  position: relative;
}

#renderer_border {
  position: absolute;
  top: 0;
  left: 25%;
  bottom: 0;
  width: 2px;
  z-index: 10;
  opacity: .8;
  background: #ccc;
  border: 1px inset #ccc;
  cursor: col-resize;
}
</style>