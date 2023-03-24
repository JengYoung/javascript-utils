import {DynamicMetaball, StaticMetaball} from './Metaball';

abstract class Metaballs<MetaballType> {
  abstract balls: MetaballType[];

  push(metaball: MetaballType) {
    this.balls.push(metaball);
  }
}

export interface IPushMetaballPayload<Options> {
  count: number;
  options: Options;
}

export class StaticMetaballs implements Metaballs<StaticMetaball> {
  balls: StaticMetaball[];

  constructor() {
    this.balls = [];
  }

  push(metaball: StaticMetaball): void {
    /* eslint-disable-next-line no-console */
    console.log(metaball);
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
    /* eslint-disable-next-line no-console */
    console.log(metaball);
  }

  moveAll() {
    /* eslint-disable-next-line no-console */
    console.log('moveAll!');
  }
}
