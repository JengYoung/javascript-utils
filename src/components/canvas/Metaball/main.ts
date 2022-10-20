import './main.module.scss';
/**
 * 메타볼을 실행하는 클래스입니다.
 */

import {MetaballCanvas} from './canvas';

interface AppInterface {
  target: Element;
  canvas: MetaballCanvas;

  width: number;
  height: number;
}

class App implements AppInterface {
  target: Element;

  canvas: MetaballCanvas;

  width: number;

  height: number;

  constructor(target: Element) {
    this.target = target;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = new MetaballCanvas(this.target, this.width, this.height);
  }

  render() {
    this.canvas.render();
  }
}

new App(document.getElementById('app') as Element).render();
