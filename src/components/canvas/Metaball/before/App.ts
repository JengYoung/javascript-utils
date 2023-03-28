import {DrawStrategy, MoveStrategy, OptimizedFuseStrategy} from './Strategies';
import {MetaballCanvas} from './Canvas';

import {
  ECanvasGradientType,
  IMetaballDataset,
  IDynamicMetaballMoveStrategy,
  EMetaballObserverKeys,
  IDynamicMetaballDrawStrategy,
} from './types';

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

  get canvasCtx() {
    return this.canvas.ctx;
  }

  get allMetaballs() {
    return this.canvas.allMetaballs;
  }

  initializeMetaballs(dataset: IMetaballDataset) {
    this.canvas.initializeMetaballs(dataset);
  }

  setDynamicMetaballMove({moveStrategy, key}: IDynamicMetaballMoveStrategy) {
    this.canvas.setDynamicMetaballMoveStrategy({moveStrategy, key});
  }

  setDynamicMetaballDraw({drawStrategy, key}: IDynamicMetaballDrawStrategy) {
    this.canvas.setDynamicMetaballDrawStrategy({drawStrategy, key});
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

const {innerWidth, innerHeight} = window;
const app = new MetaballAnimation({
  canvas: new MetaballCanvas({
    gradients: ['#123141', '#235234'],
    width: innerWidth,
    height: innerHeight,
    type: ECanvasGradientType.linear,
    options: {
      autoplay: true,
    },
  }),
  dataset: {
    dynamic: Array.from({length: 4}, (_, idx) => {
      const rate = 0.1 * (idx + 1);
      return {
        x: innerWidth * rate,
        y: innerHeight * rate,
        r: 300 * rate,
        v: {x: 0.5 * rate, y: 0.5 / rate},
        vWeight: 1 * rate,
      };
    }),
  },
});

function main() {
  const moveStrategy = new MoveStrategy();
  const drawStrategy = new DrawStrategy();
  // const fuseStrategy = new FuseStrategy();
  const fuseStrategy = new OptimizedFuseStrategy();

  app.setDynamicMetaballMove({
    moveStrategy,
    key: EMetaballObserverKeys.dynamic,
  });

  app.setDynamicMetaballDraw({
    drawStrategy,
    key: EMetaballObserverKeys.dynamic,
  });

  moveStrategy.setBefore(() => {
    fuseStrategy.exec(app.canvasCtx, app.allMetaballs);
  });

  app.mount($target);
}

main();
