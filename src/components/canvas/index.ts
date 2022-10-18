class Canvas {
  target: Element;

  canvas: HTMLCanvasElement;

  constructor(target: Element, width: number, height: number) {
    this.target = target;
    this.canvas = document.createElement('canvas');

    this.canvas.width = width;
    this.canvas.height = height;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  render() {
    this.target.append(this.canvas);
  }
}

export default Canvas;
