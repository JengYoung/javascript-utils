import {DynamicMetaball, StaticMetaball} from './Metaball';
import {MoveStrategy} from './Strategies';

abstract class Metaballs<MetaballType> {
  abstract balls: MetaballType[];

  abstract push(metaball: MetaballType): void;

  abstract moveAll(): void;
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
