import {getDist} from '~/src/utils/math';
import {
  Metaball,
  MetaballBaseInterface,
  MetaballPropInterface,
  MetaballStateInterface,
} from './Metaball';

export interface BubbleStateInterface extends MetaballStateInterface {
  scale: number;
  opacity: number;
  maxScale: number;
}

export class Bubble extends Metaball {
  state: BubbleStateInterface;

  constructor({ctx, x, y, r, v}: MetaballPropInterface) {
    super({ctx, x, y, r, v});

    this.state = {
      ctx,
      x,
      y,
      r,
      v,
      scale: 1,
      opacity: 1,
      maxScale: 1.5,
    };
  }

  burst() {}

  animate(base: MetaballBaseInterface): void {
    const {x: bx, y: by, r: br} = base;

    const maxDist = (this.r + br) * 3;

    const dist = getDist(this.x, this.y, bx, by);

    if (dist === maxDist) {
      this.burst();
    }
  }
}
