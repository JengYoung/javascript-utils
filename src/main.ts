import Cube from './animations/cube-move/index';

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

cube.render();
