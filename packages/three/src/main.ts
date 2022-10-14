// import * as THREE from 'three';

export class App {
  target: Element;

  constructor(target: Element) {
    this.target = target;
  }

  init() {}

  render() {}
}

const app = new App(document.querySelector('#app') as Element);
app.render();
