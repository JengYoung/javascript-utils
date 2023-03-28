import {DynamicMetaball, StaticMetaball} from './Metaball';
import {MoveStrategy, DrawStrategy} from './Strategies';

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

  constructor(
    public moveStrategy?: MoveStrategy,
    public drawStrategy?: DrawStrategy,
  ) {
    this.balls = [];
  }

  setMoveStrategy(moveStrategy: MoveStrategy) {
    this.moveStrategy = moveStrategy;
  }

  setDrawStrategy(drawStrategy: DrawStrategy) {
    this.drawStrategy = drawStrategy;
  }

  push(metaball: DynamicMetaball): void {
    this.balls.push(metaball);
  }

  moveAll() {
    if (!this.moveStrategy || !this.drawStrategy) return;

    const {moveStrategy, drawStrategy} = this;

    /* eslint-disable-next-line no-console */
    this.balls.forEach(ball => {
      const move = moveStrategy.exec.bind(moveStrategy);
      const draw = drawStrategy.exec.bind(drawStrategy);

      move(ball);
      draw(ball);
    });
  }
}
