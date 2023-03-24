import {DynamicMetaball, StaticMetaball} from './Metaball';

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
    console.log('moveAll!');
  }
}
export class DynamicMetaballs implements Metaballs<DynamicMetaball> {
  balls: DynamicMetaball[];

  constructor() {
    this.balls = [];
  }

  push(metaball: DynamicMetaball): void {
    this.balls.push(metaball);
  }

  moveAll() {
    /* eslint-disable-next-line no-console */
    console.log('moveAll!');
  }
}
