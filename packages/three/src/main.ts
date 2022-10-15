import * as THREE from 'three';

export class App {
  target: Element;

  canvas: HTMLCanvasElement;

  scene: THREE.Scene;

  camera: THREE.PerspectiveCamera;

  renderer: THREE.WebGLRenderer;

  light: THREE.PointLight;

  #innerWidth = window && window.innerWidth;

  #innerHeight = window && window.innerHeight;

  constructor(target: Element) {
    this.target = target;

    this.scene = new THREE.Scene();

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'scene';

    this.camera = new THREE.PerspectiveCamera(
      50,
      this.#innerWidth / this.#innerHeight,
      1,
      10000,
    );

    this.scene.add(this.camera);

    this.light = new THREE.PointLight(0xffffff, 1, 1300);
    this.light.position.set(0, 0, -750);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setSize(this.#innerWidth, this.#innerHeight);

    this.target.append(this.canvas);
  }

  init() {}

  render() {
    document.body.appendChild(this.target);
  }
}

const app = new App(document.querySelector('#app') as Element);
app.render();
