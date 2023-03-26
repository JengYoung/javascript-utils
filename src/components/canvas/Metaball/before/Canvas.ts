import {
  StaticMetaballsObserver,
  DynamicMetaballsObserver,
} from './AnimationObserver';
import {AnimationSubject} from './AnimationSubject';
import {
  DynamicMetaballsFactory,
  StaticMetaballsFactory,
} from './MetaballsFactory';
import {
  ECanvasGradientType,
  GradientCanvas,
  IDynamicMetaballDrawStrategy,
  IDynamicMetaballMoveStrategy,
  IMetaballDataset,
  IRadialGradientOptions,
} from './types';

export class MetaballCanvas implements GradientCanvas {
  $canvas: GradientCanvas['$canvas'];

  ctx: GradientCanvas['ctx'];

  type: GradientCanvas['type'];

  width: GradientCanvas['width'];

  height: GradientCanvas['height'];

  gradients: GradientCanvas['gradients'];

  metaballAnimationSubject: AnimationSubject;

  staticMetaballsFactory: StaticMetaballsFactory;

  dynamicMetaballsFactory: DynamicMetaballsFactory;

  options: GradientCanvas['options'];

  constructor({
    type,
    width,
    height,
    gradients,
    options,
  }: Omit<
    GradientCanvas,
    | '$canvas'
    | 'ctx'
    | 'render'
    | 'mount'
    | 'draw'
    | 'getLinearGradient'
    | 'getRadialGradient'
  >) {
    this.$canvas = document.createElement('canvas');

    this.ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;

    this.type = type;

    this.width = width;
    this.height = height;

    this.gradients = gradients;

    this.metaballAnimationSubject = new AnimationSubject({ctx: this.ctx});

    this.staticMetaballsFactory = new StaticMetaballsFactory();
    this.dynamicMetaballsFactory = new DynamicMetaballsFactory();

    this.options = options ?? {
      radialGradient: {r0: 0, r1: 0},
      autoplay: false,
      pause: false,
    };

    this.init();
  }

  init() {
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;
  }

  initializeMetaballs(dataset: IMetaballDataset) {
    if (dataset.static) {
      const staticMetaballs = this.staticMetaballsFactory.create({
        options: {
          ctx: this.ctx,
          data: dataset.static,
        },
      });

      this.metaballAnimationSubject.subscribe(
        new StaticMetaballsObserver(staticMetaballs, 'static'),
      );
    }

    if (dataset.dynamic) {
      const dynamicMetaballs = this.dynamicMetaballsFactory.create({
        options: {
          ctx: this.ctx,
          data: dataset.dynamic,
        },
      });

      this.metaballAnimationSubject.subscribe(
        new DynamicMetaballsObserver(dynamicMetaballs, 'dynamic'),
      );
    }
  }

  setDynamicMetaballMoveStrategy({
    moveStrategy,
    key,
  }: IDynamicMetaballMoveStrategy) {
    this.metaballAnimationSubject.notifyUpdateMoveStrategy({
      moveStrategy,
      key,
    });
  }

  setDynamicMetaballDrawStrategy({
    drawStrategy,
    key,
  }: IDynamicMetaballDrawStrategy) {
    this.metaballAnimationSubject.notifyUpdateDrawStrategy({
      drawStrategy,
      key,
    });
  }

  getLinearGradient() {
    const result = this.ctx.createLinearGradient(0, 0, 0, this.height);

    this.gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  getRadialGradient({r0 = 0, r1 = 0}: IRadialGradientOptions) {
    const result = this.ctx.createRadialGradient(0, 0, r0, 0, this.height, r1);

    this.gradients.forEach((gradient, idx) => {
      result.addColorStop(idx, gradient);
    });

    return result;
  }

  get canvasGradient(): CanvasGradient {
    switch (this.type) {
      case ECanvasGradientType.linear: {
        return this.getLinearGradient();
      }
      case ECanvasGradientType.radial: {
        return this.getRadialGradient(
          this.options?.radialGradient ?? {r0: 0, r1: 0},
        );
      }
      default: {
        return this.getLinearGradient();
      }
    }
  }

  draw(background: CanvasGradient) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = background;

    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.save();
  }

  mount($target: Element) {
    $target.appendChild(this.$canvas);

    this.render();

    if (!this.options?.pause && this.options?.autoplay) {
      this.animate();
    }
  }

  render() {
    this.draw(this.canvasGradient);

    this.metaballAnimationSubject.notify();
  }

  animate() {
    if (this.options?.pause) return;

    this.render();

    requestAnimationFrame(this.animate.bind(this));
  }
}
