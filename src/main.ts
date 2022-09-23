import Cube from './animations/cube-move/index';

const $app = document.querySelector('#app');

const $top = document.createElement('div');
const $bottom = document.createElement('div');
const $side1 = document.createElement('div');
const $side2 = document.createElement('div');
const $side3 = document.createElement('div');
const $side4 = document.createElement('div');

$top.classList.add('top');
$bottom.classList.add('bottom');
$side1.classList.add('side1');
$side2.classList.add('side2');
$side3.classList.add('side3');
$side4.classList.add('side4');

const cube = new Cube({
  target: $app as HTMLElement,
  top: $top,
  bottom: $bottom,
  sides: [$side1, $side2, $side3, $side4],
});

cube.render();
