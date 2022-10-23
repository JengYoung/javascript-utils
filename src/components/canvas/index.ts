class Canvas {
  target: Element;

  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  constructor(target: Element, width: number, height: number) {
    this.target = target;
    this.canvas = document.createElement('canvas');

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

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
