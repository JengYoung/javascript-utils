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
      new THREE.Color(0xffffff),
      new THREE.Color(0xffca00),
      new THREE.Color(0xa32634),
    ];

    const translation = new THREE.Matrix4().makeTranslation(180, 0, 0);

    for (let i = 0; i < 15; i += 1) {
      const group = new THREE.Group();

      // NOTE: 추후 벽을 만들 때 활용할 수 있다.
      // if (i % 5 === 0) {
      //   const wallGroup = new THREE.Group();

      //   const wallGeometry = new THREE.BoxGeometry(
      //     this.#innerWidth,
      //     this.#innerHeight,
      //     1,
      //   );

      //   const wallMaterial = new THREE.MeshPhysicalMaterial({
      //     color: colors[i % 4],
      //   });

      //   const wall = new THREE.Mesh(wallGeometry, wallMaterial);

      //   // techSticker

      //   const techStickerGeometry = new THREE.CircleGeometry(50, 100);
      //   const techStickerMaterial = new THREE.MeshPhysicalMaterial({
      //     // color: colors[i % 4],
      //     color: 0x124423,
      //   });
      //   const techSticker = new THREE.Mesh(
      //     techStickerGeometry,
      //     techStickerMaterial,
      //   );

      //   const rotation2 = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
      //   const translation2 = new THREE.Matrix4().makeTranslation(180, 0, 0);

      //   techSticker.position.x = -25 * Math.PI;
      //   techSticker.position.z += 1;

      //   techSticker.applyMatrix4(
      //     new THREE.Matrix4().multiplyMatrices(rotation2, translation2),
      //   );

      //   wallGroup.add(techSticker);
      //   wallGroup.add(wall);
      //   group.add(wallGroup);
      // }

      for (let j = 0; j < 50; j += 1) {
        const material = new THREE.MeshPhysicalMaterial({color: colors[i % 4]});

        const geometry = new THREE.BoxGeometry(50, 35, 180);
        const block = new THREE.Mesh(geometry, material);

        const rotation = new THREE.Matrix4().makeRotationZ(
          ((Math.PI * 2) / 50) * j,
        );

        block.applyMatrix4(
          new THREE.Matrix4().multiplyMatrices(rotation, translation),
        );

        group.add(block);
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
      for (let i = 0; i < this.obj.children.length; i += 1) {
        const circle = this.obj.children[i];
        if (this.camera.position.z <= circle.position.z) {
          this.#distance -= 180;

          circle.position.z = this.#distance;
        }
        console.log(circle);
      }

      this.camera.position.z -= 5;

      this.light.position.z -= 5;

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
