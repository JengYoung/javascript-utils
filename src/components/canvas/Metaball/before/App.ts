import {MetaballCanvas} from './Canvas';

import {ECanvasGradientType, IMetaballDataset} from './types';

export abstract class CanvasAnimation {
  abstract canvas: MetaballCanvas;

  abstract mount($target: Element): void;

  abstract render(): void;
}

export class MetaballAnimation implements CanvasAnimation {
  public canvas: CanvasAnimation['canvas'];

  public dataset: IMetaballDataset;

  constructor({
    canvas,
    dataset,
  }: {
    canvas: CanvasAnimation['canvas'];
    dataset?: IMetaballDataset;
  }) {
    this.canvas = canvas;

    this.dataset = dataset ?? {
      static: [],
      dynamic: [],
    };

    if (this.dataset?.static?.length || this.dataset?.dynamic?.length) {
      this.initializeMetaballs(this.dataset);
    }
  }

  initializeMetaballs(dataset: IMetaballDataset) {
    this.canvas.initializeMetaballs(dataset);
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
    options: {
      autoplay: true,
    },
  }),
  dataset: {
    static: [{x: 30, y: 100, r: 20}],
    dynamic: [
      {
        x: 30,
        y: 100,
        r: 20,
        v: {x: 0.1, y: 0.1},
        vWeight: 1,
      },
    ],
  },
});

app.mount($target);
