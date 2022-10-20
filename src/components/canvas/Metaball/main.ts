import './main.module.scss';
/**
 * 메타볼을 실행하는 클래스입니다.
 */

import Canvas from '..';
import {Metaball} from './Metaball';

interface AppInterface {
  target: Element;
  canvas: Canvas;

  width: number;
  height: number;

  metaball1: Metaball;
  metaball2: Metaball;

  bgGradients: [string, string];
  gradients: [string, string];
}

export class App implements AppInterface {
  target: Element;

  canvas: Canvas;

  width: number;

  height: number;

  metaball1: Metaball;

  metaball2: Metaball;

  bgGradients: [string, string];

  gradients: [string, string];

  constructor(target: Element) {
    this.target = target;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = new Canvas(this.target, this.width, this.height);

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

  get ctx() {
    return this.canvas.ctx;
  }

  gradient(gradients: [string, string]) {
    const result = this.ctx.createLinearGradient(0, 0, 0, this.height);

    gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  render() {
    const bgGradiation = this.gradient(this.bgGradients);
    this.ctx.fillStyle = bgGradiation;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const metaballGradiation = this.gradient(this.gradients);
    this.ctx.fillStyle = metaballGradiation;
    this.canvas.render();
    this.metaball1.render(this.ctx);
    this.metaball2.render(this.ctx);
    this.ctx.fill();
  }
}

new App(document.getElementById('app') as Element).render();
