/**
 * 메타볼을 실행하는 클래스입니다.
 */

import Canvas from '..';
import {Metaballs} from './MetaBalls';
import {Points} from './Points';

export class App {
  target: Element;

  canvas: Canvas;

  width: number;

  height: number;

  metaballs: Metaballs;

  points: Points;

  constructor(target: Element) {
    this.target = target;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = new Canvas(this.target, this.width, this.height);

    this.metaballs = new Metaballs({ctx: this.canvas.ctx, state: {ballCnt: 2}});

    this.points = new Points({
      width: this.width,
      height: this.height,
      gapWeight: 2,
    });
  }

  render() {
    this.canvas.render();
    this.metaballs.render();

    this.animate();
  }

  animate() {
    this.canvas.ctx.clearRect(0, 0, this.width, this.height);
    requestAnimationFrame(() => this.animate());

    this.metaballs.move();

    this.points.points.forEach(({x: x2, y: y2}, i) => {
      if (i % 2) return;
      let total = 0;
      this.metaballs.arr.forEach(metaball => {
        const {x: x1, y: y1, r} = metaball.state;

        total += r / ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
      });

      if (total >= 1.2) {
        this.canvas.ctx.fillStyle = 'orange';
        this.canvas.ctx.fillRect(x2, y2, 2, 2);
      }
    });
  }
}

new App(document.getElementById('app') as Element).render();
