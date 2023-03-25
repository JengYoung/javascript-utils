import {DynamicMetaball, StaticMetaball} from './Metaball';

abstract class Metaballs<MetaballType> {
  abstract balls: MetaballType[];

  abstract push(metaball: MetaballType): void;

  abstract moveAll(): void;
}

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

  // before() {}

  // after() {}

  exec(metaball: DynamicMetaball) {
    // console.log('this: ', metaball, this);
    this.before?.();

    metaball.move();

    this.after?.();
  }
}

export class StaticMetaballs implements Metaballs<StaticMetaball> {
  balls: StaticMetaball[];

  constructor() {
    this.balls = [];
  }

  push(metaball: StaticMetaball) {
    this.balls.push(metaball);
  }

  moveAll() {
    /* eslint-disable-next-line no-console */
    console.log('Static Metaballs moveall...!');
  }
}

export class DynamicMetaballs implements Metaballs<DynamicMetaball> {
  balls: DynamicMetaball[];

  constructor(public moveStrategy?: MoveStrategy) {
    this.balls = [];
  }

  setMoveStrategy(moveStrategy: MoveStrategy) {
    this.moveStrategy = moveStrategy;
  }

  push(metaball: DynamicMetaball): void {
    this.balls.push(metaball);
  }

  moveAll() {
    if (!this.moveStrategy) return;

    const strategy = this.moveStrategy;

    /* eslint-disable-next-line no-console */
    this.balls.forEach(strategy.exec.bind(strategy));
  }
}
