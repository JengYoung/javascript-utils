import Canvas from '..';
import {Metaballs} from './Metaballs';

interface MetaballCanvasInterface {
  target: Element;

  width: number;

  height: number;

  metaballs: Metaballs;

  bgGradients: [string, string];

  gradients: [string, string];
}

export class MetaballCanvas extends Canvas implements MetaballCanvasInterface {
  bgGradients: [string, string];

  gradients: [string, string];

  metaballs: Metaballs;

  constructor(target: Element, width: number, height: number) {
    super(target, width, height);

    this.metaballs = new Metaballs({
      ctx: this.ctx,
      num: 2,
      absorbBallNum: 5,
      canvasWidth: width,
      canvasHeight: height,
    });

    this.bgGradients = ['#85ffff', '#c2a4f9'];
    this.gradients = ['#00ffff', '#752bed'];
  }

  gradient(gradients: [string, string]) {
    const result = this.ctx.createLinearGradient(0, 0, 0, this.height);

    gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  fillGradient() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const bgGradiation = this.gradient(this.bgGradients);
    this.ctx.fillStyle = bgGradiation;

    this.ctx.fillRect(0, 0, this.width, this.height);

    const metaballGradiation = this.gradient(this.gradients);
    this.ctx.fillStyle = metaballGradiation;
  }

  animate() {
    this.fillGradient();

    this.metaballs.render(this.ctx);

    this.metaballs.animate();

    requestAnimationFrame(this.animate.bind(this));
  }

  render() {
    this.target.appendChild(this.canvas);

    this.animate();
  }
}
