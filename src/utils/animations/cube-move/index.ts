import CubeController from './controls';

interface CubeParams {
  target: HTMLElement;

  top: HTMLElement;
  bottom: HTMLElement;
  sides: HTMLElement[];
}

class Cube {
  cube: HTMLElement;

  target: HTMLElement;

  $top: HTMLElement;

  $bottom: HTMLElement;

  $sides: HTMLElement[];

  constructor({target, top, bottom, sides}: CubeParams) {
    this.cube = document.createElement('div');
    this.cube.classList.add('cube', 'animate');

    this.target = target;
    this.$top = top;
    this.$bottom = bottom;
    this.$sides = sides;

    this.init();
  }

  init() {
    const classNames = ['front', 'right', 'back', 'left'];
    this.$top.classList.add('top', 'cube-side', 'origin-top-side');
    this.$bottom.classList.add('bottom', 'cube-side', 'origin-bottom-side');
    this.$sides.forEach((side, index) => {
      side.classList.add(
        classNames[index],
        'cube-side',
        `origin-${classNames[index]}-side`,
      );
    });
  }

  render() {
    this.cube.appendChild(this.$top);
    this.cube.appendChild(this.$bottom);
    this.$sides.forEach(side => {
      this.cube.appendChild(side);
    });

    this.target.appendChild(this.cube);
  }
}

const $app = document.querySelector('#app');

const $top = document.createElement('div');
const $bottom = document.createElement('div');
const $side1 = document.createElement('div');
const $side2 = document.createElement('div');
const $side3 = document.createElement('div');
const $side4 = document.createElement('div');

const cube = new Cube({
  target: $app as HTMLElement,
  top: $top,
  bottom: $bottom,
  sides: [$side1, $side2, $side3, $side4],
});

const cubeController = new CubeController($app as HTMLElement);

cube.render();
cubeController.render();

// export default Cube;
