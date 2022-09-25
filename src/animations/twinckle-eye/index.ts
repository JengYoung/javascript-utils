export class TwinkleEye {
  target: HTMLElement;

  sight: HTMLElement;

  aboveSight: HTMLElement;

  belowSight: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;

    this.sight = document.createElement('div');
    this.sight.classList.add('twinkle-eye-sight');

    this.aboveSight = document.createElement('div');
    this.aboveSight.classList.add('twinkle-eye-sight__above');

    this.belowSight = document.createElement('div');
    this.belowSight.classList.add('twinkle-eye-sight__below');
  }

  render() {
    this.sight.appendChild(this.aboveSight);
    this.sight.appendChild(this.belowSight);

    this.target.appendChild(this.sight);
  }
}

const $target = document.querySelector('#app') as HTMLElement;

const twinckleEye = new TwinkleEye($target);

twinckleEye.render();
