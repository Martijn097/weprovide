<template>
  <div class="play2">
    <div id="container">
			<div id="container_normal"><h2 class="renderer_label">normal z-buffer</h2></div>
			<div id="container_logzbuf"><h2 class="renderer_label">logarithmic z-buffer</h2></div>
			<div id="renderer_border"></div>
		</div>

		<div id="info">
			<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - cameras - logarithmic depth buffer<br/>
			mousewheel to dolly out
		</div>
</div>

</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'

import { gsap, CSSPlugin } from 'gsap/all'
import { TimelineMax, Back, Power3, Power2 } from "gsap"
gsap.registerPlugin(CSSPlugin)

export default {
  name: 'Play',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      container: null,
    };
  },
  methods: {
    init(){
      var NEAR = 1e-6, FAR = 1e27;
      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;
      var screensplit = .25, screensplit_right = 0;
      var mouse = [ .5, .5 ];
      var zoompos = - 100, minzoomspeed = .015;
      var zoomspeed = minzoomspeed;

      var container, border, stats;
      var objects = {};

      // Generate a number of text labels, from 1µm in size up to 100,000,000 light years
      // Try to use some descriptive real-world examples of objects at each scale

      var labeldata = [
        { size: .01, scale: 0.0001, label: "microscopic (1µm)" }, // FIXME - triangulating text fails at this size, so we scale instead
        { size: .01, scale: 0.1, label: "minuscule (1mm)" },
        { size: .01, scale: 1.0, label: "tiny (1cm)" },
        { size: 1, scale: 1.0, label: "child-sized (1m)" },
        { size: 10, scale: 1.0, label: "tree-sized (10m)" },
        { size: 100, scale: 1.0, label: "building-sized (100m)" },
        { size: 1000, scale: 1.0, label: "medium (1km)" },
        { size: 10000, scale: 1.0, label: "city-sized (10km)" },
        { size: 3400000, scale: 1.0, label: "moon-sized (3,400 Km)" },
        { size: 12000000, scale: 1.0, label: "planet-sized (12,000 km)" },
        { size: 1400000000, scale: 1.0, label: "sun-sized (1,400,000 km)" },
        { size: 7.47e12, scale: 1.0, label: "solar system-sized (50Au)" },
        { size: 9.4605284e15, scale: 1.0, label: "gargantuan (1 light year)" },
        { size: 3.08567758e16, scale: 1.0, label: "ludicrous (1 parsec)" },
        { size: 1e19, scale: 1.0, label: "mind boggling (1000 light years)" },
        { size: 1.135e21, scale: 1.0, label: "galaxy-sized (120,000 light years)" },
        { size: 9.46e23, scale: 1.0, label: "... (100,000,000 light years)" }
      ];

      var container = document.getElementById( 'container' );

      var loader = new THREE.FontLoader();
      loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        var scene = this.initScene( font );

        // Initialize two copies of the same scene, one with normal z-buffer and one with logarithmic z-buffer
        objects.normal = this.initView( this.scene, 'normal', false );
        objects.logzbuf = this.initView( this.scene, 'logzbuf', true );

        this.animate();

      } );

      var stats = new Stats();
      this.container.appendChild( this.stats.dom );

      // Resize border allows the user to easily compare effects of logarithmic depth buffer over the whole scene
      var border = document.getElementById( 'renderer_border' );
      this.border.addEventListener( 'mousedown', this.onBorderMouseDown );

      this.window.addEventListener( 'mousemove', this.onMouseMove, false );
      this.window.addEventListener( 'resize', this.onWindowResize, false );
      this.addEventListener( 'wheel', this.onMouseWheel, false );
    },

    initView( scene, name, logDepthBuf ) {

      var framecontainer = document.getElementById( 'container_' + name );

      var camera = new THREE.PerspectiveCamera( 50, screensplit * SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR );
      this.scene.add( this.camera );

      var renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: logDepthBuf } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( SCREEN_WIDTH / 2, SCREEN_HEIGHT );
      renderer.domElement.style.position = "relative";
      renderer.domElement.id = 'renderer_' + name;
      framecontainer.appendChild( renderer.domElement );

      return { container: framecontainer, renderer: renderer, scene: scene, camera: camera };
    },

    initScene( font ) {
      var scene = new THREE.Scene();

      this.scene.add( new THREE.AmbientLight( 0x222222 ) );

      var light = new THREE.DirectionalLight( 0xffffff, 1 );
      light.position.set( 100, 100, 100 );
      this.scene.add( light );

      var materialargs = {
        color: 0xffffff,
        specular: 0x050505,
        shininess: 50,
        emissive: 0x000000
      };

      var geometry = new THREE.SphereBufferGeometry( 0.5, 24, 12 );

      for ( var i = 0; i < labeldata.length; i ++ ) {

        var scale = labeldata[ i ].scale || 1;

        var labelgeo = new THREE.TextBufferGeometry( labeldata[ i ].label, {
          font: font,
          size: labeldata[ i ].size,
          height: labeldata[ i ].size / 2
        } );

        labelgeo.computeBoundingSphere();

        // center text
        labelgeo.translate( - labelgeo.boundingSphere.radius, 0, 0 );

        materialargs.color = new THREE.Color().setHSL( Math.random(), 0.5, 0.5 );

        var material = new THREE.MeshPhongMaterial( materialargs );

        var group = new THREE.Group();
        group.position.z = - labeldata[ i ].size * scale;
        scene.add( group );

        var textmesh = new THREE.Mesh( labelgeo, material );
        textmesh.scale.set( scale, scale, scale );
        textmesh.position.z = - labeldata[ i ].size * scale;
        textmesh.position.y = labeldata[ i ].size / 4 * scale;
        group.add( textmesh );

        var dotmesh = new THREE.Mesh( geometry, material );
        dotmesh.position.y = - labeldata[ i ].size / 4 * scale;
        dotmesh.scale.multiplyScalar( labeldata[ i ].size * scale );
        group.add( dotmesh );
      }
      return scene;
    },

    updateRendererSizes() {
      // Recalculate size for both renderers when screen size or split location changes
      SCREEN_WIDTH = window.innerWidth;
      SCREEN_HEIGHT = window.innerHeight;

      screensplit_right = 1 - screensplit;

      objects.normal.renderer.setSize( screensplit * SCREEN_WIDTH, SCREEN_HEIGHT );
      objects.normal.camera.aspect = screensplit * SCREEN_WIDTH / SCREEN_HEIGHT;
      objects.normal.camera.updateProjectionMatrix();
      objects.normal.camera.setViewOffset( SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0, SCREEN_WIDTH * screensplit, SCREEN_HEIGHT );
      objects.normal.container.style.width = ( screensplit * 100 ) + '%';

      objects.logzbuf.renderer.setSize( screensplit_right * SCREEN_WIDTH, SCREEN_HEIGHT );
      objects.logzbuf.camera.aspect = screensplit_right * SCREEN_WIDTH / SCREEN_HEIGHT;
      objects.logzbuf.camera.updateProjectionMatrix();
      objects.logzbuf.camera.setViewOffset( SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH * screensplit, 0, SCREEN_WIDTH * screensplit_right, SCREEN_HEIGHT );
      objects.logzbuf.container.style.width = ( screensplit_right * 100 ) + '%';

      border.style.left = ( screensplit * 100 ) + "%";
    },

    animate() {
      requestAnimationFrame( animate );
      this.render();
    },

    render() {
      // Put some limits on zooming
      var minzoom = labeldata[ 0 ].size * labeldata[ 0 ].scale * 1;
      var maxzoom = labeldata[ labeldata.length - 1 ].size * labeldata[ labeldata.length - 1 ].scale * 100;
      var damping = ( Math.abs( zoomspeed ) > minzoomspeed ? .95 : 1.0 );

      // Zoom out faster the further out you go
      var zoom = THREE.MathUtils.clamp( Math.pow( Math.E, zoompos ), minzoom, maxzoom );
      zoompos = Math.log( zoom );

      // Slow down quickly at the zoom limits
      if ( ( zoom == minzoom && zoomspeed < 0 ) || ( zoom == maxzoom && zoomspeed > 0 ) ) {

        damping = .85;

      }

      zoompos += zoomspeed;
      zoomspeed *= damping;

      objects.normal.camera.position.x = Math.sin( .5 * Math.PI * ( this.mouse[ 0 ] - .5 ) ) * zoom;
      objects.normal.camera.position.y = Math.sin( .25 * Math.PI * ( this.mouse[ 1 ] - .5 ) ) * zoom;
      objects.normal.camera.position.z = Math.cos( .5 * Math.PI * ( this.mouse[ 0 ] - .5 ) ) * zoom;
      objects.normal.camera.lookAt( objects.normal.scene.position );

      // Clone camera settings across both scenes
      objects.logzbuf.camera.position.copy( objects.normal.camera.position );
      objects.logzbuf.camera.quaternion.copy( objects.normal.camera.quaternion );

      // Update renderer sizes if the split has changed
      if ( screensplit_right != 1 - screensplit ) {

        this.updateRendererSizes();

      }

      objects.normal.renderer.render( objects.normal.scene, objects.normal.camera );
      objects.logzbuf.renderer.render( objects.logzbuf.scene, objects.logzbuf.camera );

      stats.update();
    },

    onWindowResize() {
      this.updateRendererSizes();
    },

    onBorderMouseDown( ev ) {
      // activate draggable window resizing bar
      window.addEventListener( "mousemove", this.onBorderMouseMove );
      window.addEventListener( "mouseup", this.onBorderMouseUp );
      ev.stopPropagation();
      ev.preventDefault();
    },

    onBorderMouseMove( ev ) {
      screensplit = Math.max( 0, Math.min( 1, ev.clientX / window.innerWidth ) );
      ev.stopPropagation();
    },

    onBorderMouseUp() {
      window.removeEventListener( "mousemove", this.onBorderMouseMove );
      window.removeEventListener( "mouseup", this.onBorderMouseUp );
    },

    onMouseMove( ev ) {
      this.mouse[ 0 ] = ev.clientX / window.innerWidth;
      this.mouse[ 1 ] = ev.clientY / window.innerHeight;
    },

    onMouseWheel( ev ) {
      var amount = ev.deltaY;
      if ( amount === 0 ) return;
      var dir = amount / Math.abs( amount );
      zoomspeed = dir / 10;

      // Slow down default zoom speed after user starts zooming, to give them more control
      minzoomspeed = 0.001;
    }
  },
  mounted() {
    this.init();

    
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