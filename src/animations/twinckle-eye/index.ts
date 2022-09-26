export class TwinkleEye {
  target: HTMLElement;

  sight: HTMLCanvasElement;

  constructor(target: HTMLElement) {
    this.target = target;

    this.sight = document.createElement('canvas');
    this.sight.classList.add('twinkle-eye-sight');
    console.log(target.clientHeight);
    this.sight.width = window.screen.width;
    this.sight.height = target.clientHeight;

    const ctx = this.sight.getContext('2d') as CanvasRenderingContext2D;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.sight.height * 0.5);

    ctx.bezierCurveTo(
      this.sight.width * 0.25,
      this.sight.height * 0.4,
      this.sight.width * 0.5,
      this.sight.height * 0.4,
      this.sight.width * 0.5,
      this.sight.height * 0.4,
    );

    ctx.bezierCurveTo(
      this.sight.width * 0.5,
      this.sight.height * 0.4,
      this.sight.width * 0.75,
      this.sight.height * 0.4,
      this.sight.width,
      this.sight.height * 0.5,
    );

    // ctx.lineTo(this.sight.width, this.sight.height * 0.5);
    ctx.lineTo(this.sight.width, 0);

    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx.fill();
    // ctx?.fillRect(0, 0, this.sight.width, 0.5 * this.sight.height);

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
