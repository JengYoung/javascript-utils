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
      r,
      v: {x: vx, y: vy},
    } = metaball;

    metaball.setX(x + vx);
    metaball.setY(y + vy);

    const ctx = metaball.getCtx();

    const shouldChangeXDirection = () => {
      return (x - r <= 0 && vx < 0) || (x + r >= ctx.canvas.width && vx > 0);
    };

    const shouldChangeYDirection = () => {
      return (y + r >= ctx.canvas.height && vy > 0) || (y - r <= 0 && vy < 0);
    };

    if (shouldChangeXDirection()) {
      metaball.setVx(metaball.vx * -1);
    }

    if (shouldChangeYDirection()) {
      metaball.setVy(metaball.vy * -1);
    }

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