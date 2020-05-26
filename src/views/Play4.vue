<template>
  <div class="play4">
    <div id="container" ref="sceneContainer"></div>
    <div id="blocker">
      <div id="instructions">
        <span style="font-size:40px">Click to play</span>
        <br />
        (W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'

import { gsap, CSSPlugin } from 'gsap/all'
import { TimelineMax, Back, Power3, Power2 } from "gsap"
gsap.registerPlugin(CSSPlugin)

export default {
  name: 'Play4',
  data () {
    return {
      UNITWIDTH: 90,// Width of a cubes in the maze
      UNITHEIGHT: 45,// Height of the cubes in the maze
      PLAYERSPEED: 800.0,// How fast the player moves
      clock: null,
      camera: null,
      controls: null,
      container: null,
      scene: null,
      renderer: null,
      mapSize: null,
      totalCubesWide: null,
      collidableObjects: [],
      controlsEnabled: false,// Flag to determine if the player can move and look around
      moveForward: false,// Flags to determine which direction the player is moving
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      playerVelocity: new THREE.Vector3(), // Velocity vector for the player
    };
  },
  methods: {
     getPointerLock() {
       document.onclick = () => {
        this.container.requestPointerLock();

       }
      // document.onclick = function () {
      //   // this.container.requestPointerLock();
      //   this.container.requestPointerLock();
      // }
      document.addEventListener('pointerlockchange', this.lockChange, false); 
    },
    // Switch the controls on or off
    lockChange() {
      // Turn on controls
      if (document.pointerLockElement === this.container) {
        blocker.style.display = "none";
        this.controls.enabled = true;
        console.log('controls moeten nu enabled zijn');
        this.controlsEnabled = true;
      // Turn off the controls
      } else {
        // Display the blocker and instruction
        blocker.style.display = "";
        this.controls.enabled = false;
        console.log('controls moeten nu disabled zijn');
        this.controlsEnabled = false;
      }
    },
    init() {
      // Set up the game
      // Set clock to keep track of frames
      this.clock = new THREE.Clock();
      // Create the scene where everything will go
      this.scene = new THREE.Scene();
      // Add some fog for effects
      this.scene.fog = new THREE.FogExp2(0xcccccc, 0.0015);
      // Set render settings
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(this.scene.fog.color);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // Render to the container
      this.container = document.getElementById('container');
      this.container.appendChild(this.renderer.domElement);
      // Set camera position and view details
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
      this.camera.position.y = 20; // Height the camera will be looking from
      this.camera.position.x = 0;
      this.camera.position.z = 0;
      // Add the camera to the controller, then add to the scene
      this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
      this.scene.add(this.controls.getObject());
      // Check to see if keys are being pressed to move the player
      this.listenForPlayerMovement();
      // Add the walls(cubes) of the maze
      this.createMazeWalls();
      // Add ground plane
      this.createGround();
      // Add boundry walls that surround the maze
      this.createPerimWalls();
      // Add lights to the scene
      this.addLights();
      // Listen for if the window changes sizes
      window.addEventListener('resize', this.onWindowResize, false);

      this.getPointerLock();
      this.lockChange();
    },
    // Add event listeners for player movement key presses
    listenForPlayerMovement() {
      // Listen for when a key is pressed
      // If it's a specified key, mark the direction as true since moving
      var onKeyDown = function(event) {
        switch (event.keyCode) {
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
      };
      // Listen for when a key is released
      // If it's a specified key, mark the direction as false since no longer moving
      var onKeyUp = function(event) {
        console.log(onKeyUp);
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            this.moveForward = false;
            console.log(this.moveForward);
            console.log(this.onKeyUp);
            console.log("loopt naar voren");
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
      };
      // Add event listeners for when movement keys are pressed and released
      document.addEventListener('keydown', this.onKeyDown, false);
      document.addEventListener('keyup', this.onKeyUp, false);
    },
    // Add lights to the scene
    addLights() {
      var lightOne = new THREE.DirectionalLight(0xffffff);
      lightOne.position.set(1, 1, 1);
      this.scene.add(lightOne);

      var lightTwo = new THREE.DirectionalLight(0xffffff, .4);
      lightTwo.position.set(1, -1, -1);
      this.scene.add(lightTwo);

      var lightThree = new THREE.AmbientLight(0x222222);
      lightThree.position.set(1, 0, 0);
      this.scene.add(lightThree);
    },
    // Create the maze walls using cubes that are mapped with a 2D array
    createMazeWalls() {
      // Maze wall mapping, assuming matrix
      // 1's are cubes, 0's are empty space
      var map = [
        [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, ],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, ],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, ],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, ],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, ],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, ]
      ];

      // wall details
      var wallGeo = new THREE.BoxGeometry(this.UNITWIDTH, this.UNITHEIGHT, this.UNITWIDTH);
      var wallMat = new THREE.MeshPhongMaterial({
        color: 0x81cfe0,
        flatShading: true
      });

      // Used to keep cubes within boundry walls
      var widthOffset = this.UNITWIDTH / 2;
      // Used to set cube on top of the place since a cube's position is at its center
      var heightOffset = this.UNITHEIGHT / 2;

      this.totalCubesWide = map[0].length;

      // Place walls where `1`s are
      for (var i = 0; i < this.totalCubesWide; i++) {
        for (var j = 0; j < map[i].length; j++) {
          if (map[i][j]) {
            var wall = new THREE.Mesh(wallGeo, wallMat);
            wall.position.z = (i - this.totalCubesWide / 2) * this.UNITWIDTH + widthOffset;
            wall.position.y = heightOffset;
            wall.position.x = (j - this.totalCubesWide / 2) * this.UNITWIDTH + widthOffset;
            this.scene.add(wall);
          }
        }
      }
    },
    // Create the ground plane that the maze sits on top of
    createGround() {
      // Create the ground based on the map size the matrix/cube size produced
      this.mapSize = this.totalCubesWide * this.UNITWIDTH;
      // ground
      var groundGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
      var groundMat = new THREE.MeshPhongMaterial({
        color: 0xA0522D,
        side: THREE.DoubleSide,
        flatShading: true
      });

      var ground = new THREE.Mesh(groundGeo, groundMat);
      ground.position.set(0, 1, 0);
      ground.rotation.x = this.degreesToRadians(90);
      this.scene.add(ground);
    },
    // Make the four perimeter walls for the maze
    createPerimWalls() {
      var halfMap = this.mapSize / 2;  // Half the size of the map
      var sign = 1;               // Used to make an amount positive or negative

      // Loop through twice, making two perimeter walls at a time
      for (var i = 0; i < 2; i++) {
          var perimGeo = new THREE.PlaneGeometry(this.mapSize, this.UNITHEIGHT);
          // Make the material double sided
          var perimMat = new THREE.MeshPhongMaterial({ color: 0x464646, side: THREE.DoubleSide });
          // Make two walls
          var perimWallLR = new THREE.Mesh(perimGeo, perimMat);
          var perimWallFB = new THREE.Mesh(perimGeo, perimMat);

          // Create left/right walls
          perimWallLR.position.set(halfMap * sign, this.UNITHEIGHT / 2, 0);
          perimWallLR.rotation.y = this.degreesToRadians(90);
          this.scene.add(perimWallLR);
          this.collidableObjects.push(perimWallLR);
          // Create front/back walls
          perimWallFB.position.set(0, this.UNITHEIGHT / 2, halfMap * sign);
          this.scene.add(perimWallFB);
          this.collidableObjects.push(perimWallFB);

          sign = -1; // Swap to negative value
      }
    },
    // Update the camera and renderer when the window changes size
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      this.render();
      requestAnimationFrame(this.animate);
      // Get the change in time between frames
      var delta = this.clock.getDelta();
      //animate the player camera
      this.playerVelocity.x -= this.playerVelocity.x * 10.0 * delta;
      this.playerVelocity.z -= this.playerVelocity.z * 10.0 * delta;
      if (this.moveForward) {
        this.playerVelocity.z -= this.PLAYERSPEED * delta;
        console.log(this.moveForward);
      } 
      if (this.moveBackward) {
        this.playerVelocity.z += this.PLAYERSPEED * delta;
        console.log(this.moveBackward);
      } 
      if (this.moveLeft) {
        this.playerVelocity.x -= this.PLAYERSPEED * delta;
        console.log(this.moveLeft);
      } 
      if (this.moveRight) {
        this.playerVelocity.x += this.PLAYERSPEED * delta;
      }
      if( !( this.moveForward || this.moveBackward || this.moveLeft || this.moveRight)) {
        // No movement key being pressed. Stop movement
        console.log(this.moveForward);
        this.playerVelocity.x = 0;
        this.playerVelocity.z = 0;
      }
      this.controls.getObject().translateX(this.playerVelocity.x * delta);
      this.controls.getObject().translateZ(this.playerVelocity.z * delta);
    },
    // Render the scene
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    // Converts degrees to radians
    degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    },
    // Converts radians to degrees
    radiansToDegrees(radians) {
      return radians * 180 / Math.PI;
    },
  },
  created(){
    
  },
  mounted() {
    // Get the pointer lock state
    // Set up the game
    this.init();
    // this.getPointerLock();

    // Start animating the scene
    this.animate();
  }
}

</script>

<style lang="scss" scoped>
html, body {
  width: 100%;
  height: 100%;
}
body {
  background-color: #ffffff;
  margin: 0;
  overflow: hidden;
  font-family: arial;
}
#container{
  box-sizing: border-box;
  height: 100%;
  left: 0;
  margin: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
#blocker {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
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
</style>