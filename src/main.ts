class Canvas {
  target: Element;

  canvas: HTMLCanvasElement;

  width: number;

  height: number;

  constructor(target: Element, width: number, height: number) {
    this.target = target;
    this.canvas = document.createElement('canvas');

    this.width = width;
    this.height = height;
  }
}

export default Canvas;
