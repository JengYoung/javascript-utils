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

export default Cube;
