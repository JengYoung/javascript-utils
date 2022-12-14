import {getDist, getRandom} from '~/src/utils/math';
import {
  Metaball,
  MetaballBaseInterface,
  MetaballPropInterface,
  MetaballStateInterface,
} from './Metaball';

export interface BubbleStateInterface extends MetaballStateInterface {
  scale: number;
  opacity: number;
  isBurst: boolean;
}

export class Bubble extends Metaball {
  maxScale: number;

  state: BubbleStateInterface;

  constructor({ctx, x, y, r, v}: MetaballPropInterface) {
    super({ctx, x, y, r, v});

    this.maxScale = 1.1;

    this.state = {
      ctx,
      x,
      y,
      r,
      v,
      scale: 1,
      opacity: 1,
      isBurst: false,
    };
  }

  get stickyWeight() {
    return 1.05;
  }

  get scale() {
    return this.state.scale;
  }

  get opacity() {
    return this.state.opacity;
  }

  get isBurst() {
    return this.state.isBurst;
  }

  burst() {
    if (this.scale >= this.maxScale) {
      this.setState({
        x: this.ctx.canvas.width / 2,
        y: this.ctx.canvas.height / 2,
        r: getRandom(50, 100, {allowNagative: false}),
        v: [
          getRandom(0, 1, {allowNagative: true}),
          getRandom(0, 1, {allowNagative: true}),
        ],
        scale: 1,
        opacity: 1,
        isBurst: false,
      } as BubbleStateInterface);

      return;
    }

    const nextScale = this.scale * 1.02;
    const nextOpacity = this.opacity - 0.1;

    this.setState({
      ...this.state,
      r: this.r * nextScale,
      scale: nextScale,
      opacity: nextOpacity,
    } as BubbleStateInterface);
  }

  setState(state: Partial<BubbleStateInterface>) {
    super.setState(state);
  }

  animate(base: MetaballBaseInterface): void {
    if (this.isBurst) {
      this.burst();
      return;
    }

    const {x: bx, y: by, r: br} = base;

    const maxDist = (this.r + br) * 1.8;

    const dist = getDist(this.x, this.y, bx, by);

    if (dist >= maxDist) {
      this.setState({
        isBurst: true,
      });
    }

    if (dist < maxDist) {
      this.setState({
        x: this.x + this.v[0],
        y: this.y + this.v[1],
      });
    }
  }

  render(
    ctx: CanvasRenderingContext2D,
    startAngle: number = 0,
    endAngle: number = Math.PI * 2,
  ) {
    ctx.globalAlpha = this.opacity;

    super.render(ctx, startAngle, endAngle);

    ctx.globalAlpha = 1;
  }
}
