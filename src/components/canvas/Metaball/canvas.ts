import Canvas from '..';
import {Metaball} from './Metaball';

interface MetaballCanvasInterface {
  target: Element;

  width: number;

  height: number;

  metaball1: Metaball;

  metaball2: Metaball;

  bgGradients: [string, string];

  gradients: [string, string];
}

export class MetaballCanvas extends Canvas implements MetaballCanvasInterface {
  metaball1: Metaball;

  metaball2: Metaball;

  bgGradients: [string, string];

  gradients: [string, string];

  constructor(target: Element, width: number, height: number) {
    super(target, width, height);

    this.metaball1 = new Metaball({
      x: 200,
      y: 200,
      r: 150,
    });

    this.metaball2 = new Metaball({
      x: 500,
      y: 500,
      r: 200,
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

  render() {
    this.target.appendChild(this.canvas);

    const bgGradiation = this.gradient(this.bgGradients);
    this.ctx.fillStyle = bgGradiation;

    this.ctx.fillRect(0, 0, this.width, this.height);

    const metaballGradiation = this.gradient(this.gradients);
    this.ctx.fillStyle = metaballGradiation;

    this.metaball1.render(this.ctx);
    this.metaball2.render(this.ctx);

    this.ctx.fill();
  }
}
