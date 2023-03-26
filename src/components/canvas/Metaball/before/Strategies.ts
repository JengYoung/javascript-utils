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
