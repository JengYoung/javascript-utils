export class TwinkleEye {
  target: HTMLElement;

  sight: HTMLCanvasElement;

  height: number;

  constructor(target: HTMLElement, height: number = 100) {
    this.target = target;

    this.sight = document.createElement('canvas');
    this.sight.classList.add('twinkle-eye-sight');

    this.sight.width = window.screen.width;
    this.sight.height = window.innerHeight;

    this.height = height;

    const ctx = this.sight.getContext('2d') as CanvasRenderingContext2D;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, (this.sight.height - this.height) * 0.5);

    ctx.bezierCurveTo(
      this.sight.width * 0.25,
      this.sight.height * 0.4 - this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * 0.4 - this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * 0.4 - this.height * 0.5,
    );

    ctx.bezierCurveTo(
      this.sight.width * 0.5,
      this.sight.height * 0.4 - this.height * 0.5,
      this.sight.width * 0.75,
      this.sight.height * 0.4 - this.height * 0.5,
      this.sight.width,
      this.sight.height * 0.5 - this.height * 0.5,
    );

    ctx.lineTo(this.sight.width, 0);

    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx.fill();

    // 아래쪽 눈도 구현한다.
    ctx.beginPath();
    ctx.moveTo(0, (this.sight.height + this.height) * 0.5);
    ctx.bezierCurveTo(
      this.sight.width * 0.25,
      this.sight.height * 0.6 + this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * 0.6 + this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * 0.6 + this.height * 0.5,
    );

    ctx.bezierCurveTo(
      this.sight.width * 0.5,
      this.sight.height * 0.6 + this.height * 0.5,
      this.sight.width * 0.75,
      this.sight.height * 0.6 + this.height * 0.5,
      this.sight.width,
      this.sight.height * 0.5 + this.height * 0.5,
    );

    ctx.lineTo(this.sight.width, this.sight.height);
    ctx.lineTo(0, this.sight.height);

    ctx.fillStyle = 'rgba(0, 0, 0)';
    ctx?.fill();
  }

  render() {
    this.target.appendChild(this.sight);
  }
}

const $target = document.querySelector('#app') as HTMLElement;

const twinckleEye = new TwinkleEye($target);

twinckleEye.render();
