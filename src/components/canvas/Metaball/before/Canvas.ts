import {GradientCanvas, IRadialGradientOptions} from './types';

export class MetaballCanvas implements GradientCanvas {
  $canvas: GradientCanvas['$canvas'];

  ctx: GradientCanvas['ctx'];

  type: GradientCanvas['type'];

  width: GradientCanvas['width'];

  height: GradientCanvas['height'];

  gradients: GradientCanvas['gradients'];

  constructor({
    type,
    width,
    height,
    gradients,
  }: Omit<GradientCanvas, '$canvas' | 'ctx'>) {
    this.$canvas = document.createElement('canvas');

    this.ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;

    this.type = type;

    this.width = width;
    this.height = height;

    this.gradients = gradients;
  }

  getLinearGradient() {
    const result = this.ctx.createLinearGradient(0, 0, 0, this.height);

    this.gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  getRadialGradient({r0 = 0, r1 = 0}: IRadialGradientOptions) {
    const result = this.ctx.createRadialGradient(0, 0, r0, 0, this.height, r1);

    this.gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  draw(background: CanvasGradient) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = background;

    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  mount($target: Element) {
    $target.appendChild(this.$canvas);

    this.render();
  }

  render() {
    const canvasGradiation = this.getLinearGradient();

    this.draw(canvasGradiation);
  }
}
