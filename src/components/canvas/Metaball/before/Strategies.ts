import {DynamicMetaball} from './Metaball';

abstract class Strategy {
  abstract exec(...args: unknown[]): void;

  abstract before?: (...args: unknown[]) => void;

  abstract after?: (...args: unknown[]) => void;
}

export class MoveStrategy implements Strategy {
  before?: (...args: unknown[]) => void;

  after?: (...args: unknown[]) => void;

  constructor() {}

  setBefore(callback: (...args: unknown[]) => void) {
    this.before = callback.bind(this);
  }

  setAfter(callback: (...args: unknown[]) => void) {
    this.after = callback.bind(this);
  }

  exec(metaball: DynamicMetaball) {
    // console.log('this: ', metaball, this);
    this.before?.();

    const {
      x,
      y,
      v: {x: vx, y: vy},
    } = metaball;

    metaball.setX(x + vx);
    metaball.setY(y + vy);

    metaball.draw();

    this.after?.();
  }
}

export class DrawStrategy implements Strategy {
  before?: (...args: unknown[]) => void;

  after?: (...args: unknown[]) => void;

  constructor() {}

  setBefore(callback: (...args: unknown[]) => void) {
    this.before = callback.bind(this);
  }

  setAfter(callback: (...args: unknown[]) => void) {
    this.after = callback.bind(this);
  }

  exec(metaball: DynamicMetaball) {
    this.before?.();

    const ctx = metaball.getCtx();

    const {x, y, r} = metaball;

    ctx.save();

    ctx.beginPath();

    ctx.fillStyle = '#f7f711';
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();

    ctx.restore();

    this.after?.();
  }
}
