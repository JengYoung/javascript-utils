class CD {
  target: HTMLElement;

  cd: HTMLElement;

  cdCenter: HTMLElement;

  degree: number;

  detail: number;

  isRotate: boolean;

  constructor(parent: HTMLElement) {
    this.target = parent;

    this.cd = document.createElement('div');
    this.cd.classList.add('cd-player__cd', 'cd', 'playing');

    this.cdCenter = document.createElement('div');
    this.cdCenter.classList.add('cd__center');

    this.degree = 0;
    this.detail = 0;

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

  animate(flag: boolean) {
    this.cd.style.cssText = `transform: rotate(${this.degree}deg)`;
    this.degree = (this.degree + this.detail) % 360;

    if (flag) {
      this.detail = Math.min(1.8, this.detail + 0.005);
    } else {
      this.detail = this.detail > 0.01 ? this.detail * 0.99 : 0;
    }

    requestAnimationFrame(this.animate.bind(this, this.isRotate));
  }
}

export default CD;
