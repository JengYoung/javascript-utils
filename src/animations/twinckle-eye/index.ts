export class TwinkleEye {
  target: HTMLElement;

  sight: HTMLCanvasElement;

  belowSight: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;

    this.sight = document.createElement('canvas');
    this.sight.classList.add('twinkle-eye-sight');
    console.log(target.clientHeight);
    this.sight.width = window.screen.width;
    this.sight.height = target.clientHeight;

    const ctx = this.sight.getContext('2d') as CanvasRenderingContext2D;

    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx?.fillRect(0, 0, this.sight.width, 0.5 * this.sight.height);

    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx?.fillRect(
      0,
      0.5 * this.sight.height,
      this.sight.width,
      0.5 * this.sight.height,
    );
  }

  render() {
    this.target.appendChild(this.sight);
  }
}

const $target = document.querySelector('#app') as HTMLElement;

const twinckleEye = new TwinkleEye($target);

twinckleEye.render();
