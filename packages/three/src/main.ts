import '../scss/style.module.scss';
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

  obj: THREE.Group;

  #MAX_DIST = -13 * 180;

  #distance = this.#MAX_DIST;

  constructor(target: Element) {
    this.target = target;

    // 장면을 만듦.
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

    this.light = new THREE.PointLight(0xffffff, 1, 3000);
    this.light.position.set(0, -50, -150);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setSize(this.#innerWidth, this.#innerHeight);

    this.obj = new THREE.Group();

    this.target.append(this.canvas);

    this.init();
  }

  init() {
    const colors = [
      new THREE.Color(0x6401da),
      new THREE.Color(0x7401da),
      new THREE.Color(0x8401da),
      new THREE.Color(0x9401da),
    ];

    const translation = new THREE.Matrix4().makeTranslation(150, 0, 0);

    for (let i = 0; i < 14; i += 1) {
      const group = new THREE.Group();

      for (let j = 0; j < 50; j += 1) {
        const material = new THREE.MeshPhysicalMaterial({color: colors[i % 4]});

        const geometry = new THREE.BoxGeometry(50, 30, 170);
        const cube = new THREE.Mesh(geometry, material);

        const rotation = new THREE.Matrix4().makeRotationZ(
          ((Math.PI * 2) / 50) * j,
        );

        cube.applyMatrix4(
          new THREE.Matrix4().multiplyMatrices(rotation, translation),
        );

        group.add(cube);
      }

      group.position.z = -i * 180;
      this.obj.add(group);
    }

    this.#distance = this.#MAX_DIST;

    this.scene.add(this.obj);

    this.renderer.render(this.scene, this.camera);

    const animate = this.animate();

    animate();
  }

  animate() {
    /* eslint-disable-next-line no-unused-vars */
    let counter = 0;

    const cb = () => {
      for (let i = 0; i < 14; i += 1) {
        const circle = this.obj.children[i];

        if (this.camera.position.z <= circle.position.z) {
          this.#distance -= 180;

          circle.position.z = this.#distance;
        }
      }

      this.camera.position.z -= 3;

      this.light.position.z -= 3;

      counter += 1;

      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(cb);
    };

    return cb;
  }

  render() {
    document.body.appendChild(this.target);
  }
}

const app = new App(document.querySelector('#app') as Element);
app.render();
