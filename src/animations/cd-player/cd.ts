class CD {
  target: HTMLElement;

  cd: HTMLElement;

  cdCenter: HTMLElement;

  degree: number;

  isRotate: boolean;

  constructor(parent: HTMLElement) {
    this.target = parent;

    this.cd = document.createElement('div');
    this.cd.classList.add('cd-player__cd', 'cd', 'playing');

    this.cdCenter = document.createElement('div');
    this.cdCenter.classList.add('cd__center');

    this.degree = 0;

    this.isRotate = false;
    requestAnimationFrame(this.animate.bind(this, this.isRotate));
  }

  play() {
    this.isRotate = true;
  }

  stop() {
    this.isRotate = false;
  }

  render() {
    this.cd.appendChild(this.cdCenter);
    this.target.appendChild(this.cd);
  }

  animate(flag: boolean, timestamp) {
    if (flag) {
      this.cd.style.cssText = `transform: rotate(${this.degree}deg)`;
      this.degree = (this.degree + 1.8) % 360;
    }

    requestAnimationFrame(this.animate.bind(this, this.isRotate));
  }
}

export default CD;
