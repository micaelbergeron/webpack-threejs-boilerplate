import * as THREE from 'three'
import AbstractApplication from 'scripts/views/AbstractApplication'
const glslify = require('glslify')
const shaderVert = glslify('./../shaders/custom.vert')
const shaderFrag = glslify('./../shaders/custom.frag')

class Main extends AbstractApplication {
  constructor(){
    super();

    let canvas = document.createElement('canvas')
    canvas.width = 256;
    canvas.height = 256;
    canvas.id = 'texture';
    this._texture = {
      ctx: canvas.getContext('2d'),
      canvas: canvas,
      tex: new THREE.Texture(canvas)
    };
    canvas.addEventListener("mousemove", (e) => this.updateMouse(e));
    document.body.appendChild(canvas);
    
    var geometry = new THREE.BoxGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({ map: this._texture.tex });

    this._mesh = new THREE.Mesh(geometry, material);
    this._scene.add(this._mesh);
    this._mousePos = {};

    this.animate();
  }

  updateMouse(evt) {
    var rect = this._texture.canvas.getBoundingClientRect();
    const pos = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };

    this._mousePos = pos;
  }

  update() {
    let { ctx } = this._texture;
    let { x, y } = this._mousePos;
    ctx.fillStyle = "rgb(200,0,0)";  
    ctx.fillRect(10, 10, 55, 50);

    ctx.fillStyle = "#000000";
    ctx.fillRect (x, y, 4, 4);

    this._texture.tex.needsUpdate = true;
  }
}
export default Main;
