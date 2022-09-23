interface CubeParams {
  target: HTMLElement;

  top: HTMLElement;
  bottom: HTMLElement;
  sides: HTMLElement[];
}

class Cube {
  target: HTMLElement;

  $top: HTMLElement;

  $bottom: HTMLElement;

  $sides: HTMLElement[];

  constructor({target, top, bottom, sides}: CubeParams) {
    this.target = target;
    this.$top = top;
    this.$bottom = bottom;
    this.$sides = sides;
  }

  render() {
    this.target.appendChild(this.$top);
    this.target.appendChild(this.$bottom);
    this.$sides.forEach(side => {
      this.target.appendChild(side);
    });
  }
}

export default Cube;
