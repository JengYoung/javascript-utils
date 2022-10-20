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

  metaball: Metaball;
}

export class App implements AppInterface {
  target: Element;

  canvas: Canvas;

  width: number;

  height: number;

  metaball: Metaball;

  constructor(target: Element) {
    this.target = target;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = new Canvas(this.target, this.width, this.height);

    this.metaball = new Metaball({
      x: 100,
      y: 100,
      r: 50,
    });
  }

  get ctx() {
    return this.canvas.ctx;
  }

  render() {
    this.canvas.render();
    this.metaball.render(this.ctx);
    this.ctx.fill();
  }
}

new App(document.getElementById('app') as Element).render();
