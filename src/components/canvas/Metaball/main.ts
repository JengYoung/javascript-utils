/**
 * 메타볼을 실행하는 클래스입니다.
 */

import Canvas from '..';

export class App {
  target: Element;

  canvas: Canvas;

  width: number;

  height: number;

  constructor(target: Element) {
    this.target = target;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = new Canvas(this.target, this.width, this.height);
  }

  render() {
    this.canvas.render();
  }
}

new App(document.getElementById('app') as Element).render();
