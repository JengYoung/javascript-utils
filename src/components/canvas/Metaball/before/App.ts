import {MetaballCanvas} from './Canvas';
import {ECanvasGradientType} from './types';

export abstract class CanvasAnimation {
  abstract canvas: MetaballCanvas;

  abstract mount($target: Element): void;

  abstract render(): void;
}

export class MetaballAnimation implements CanvasAnimation {
  public canvas: CanvasAnimation['canvas'];

  constructor({canvas}: Omit<CanvasAnimation, 'mount' | 'render'>) {
    this.canvas = canvas;
  }

  mount($target: Element) {
    const $metaballAnimation = document.createElement('div');
    $metaballAnimation.className = 'metaball-animation';

    $target.appendChild($metaballAnimation);

    this.canvas.mount($metaballAnimation);
  }

  render() {
    this.canvas.render();
  }
}

const $target = document.body;

const app = new MetaballAnimation({
  canvas: new MetaballCanvas({
    gradients: ['#123141', '#235234'],
    width: 400,
    height: 400,
    type: ECanvasGradientType.linear,
  }),
});

app.mount($target);
