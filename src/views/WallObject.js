import * as THREE from 'three';

export default class WallObject 
{
  constructor(width, height, depth) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.setVertexColors();
  }

  setVertexColors () {
    for (let i = 0, l = this.geometry.faces.length; i < l; i++) {
      let face = this.geometry.faces[i];
      face.vertexColors[0] = this.vertexColor();
      face.vertexColors[1] = this.vertexColor();
      face.vertexColors[2] = this.vertexColor();
    }
    return this;
  }

  vertexColor () {
    return new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
  }

  setMaterial () {
    this.material = new THREE.MeshPhongMaterial({
        // specular: 0xffffff, 
        transparent: true,
        opacity:0.1,
        // flatShading: THREE.FlatShading, 
        // vertexColors: THREE.VertexColors 
    });
    // this.material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    return this;
  }

  setMesh () {
    this.wallMesh = new THREE.Mesh(this.geometry, this.material);
    return this;
  }

  setPosition (x, y, z) {
    this.wallMesh.position.x = x;
    this.wallMesh.position.y = y;
    this.wallMesh.position.z = z;
    return this;
  }

  create () {
    this.setMaterial();
    this.setMesh();
    return this;
  }
}