import {StaticMetaball} from './Metaball';

import {
  DynamicMetaballs,
  IPushMetaballPayload,
  StaticMetaballs,
} from './Metaballs';

import {IDynamicMetaballParams, IStaticMetaballParams} from './types';

export abstract class MetaballsFactory {
  abstract createMetaballs(): StaticMetaballs | DynamicMetaballs;

  createMetaballByCount(
    metaballs: StaticMetaballs,
    {
      count,
      options,
    }: IPushMetaballPayload<IStaticMetaballParams | IDynamicMetaballParams>,
  ) {
    for (let i = 0; i < count; i += 1) {
      metaballs.push(new StaticMetaball(options));
    }
  }

  create(
    options: IPushMetaballPayload<
      IStaticMetaballParams | IDynamicMetaballParams
    >,
  ) {
    const metaballs = this.createMetaballs();

    this.createMetaballByCount(metaballs, options);

    return metaballs;
  }
}

export class StaticMetaballFactory extends MetaballsFactory {
  constructor() {
    super();
  }

  createMetaballs(): StaticMetaballs {
    const metaballs = new StaticMetaballs();

    return metaballs;
  }
}

export class DynamicMetaballFactory extends MetaballsFactory {
  constructor() {
    super();
  }

  createMetaballs(): DynamicMetaballs {
    const metaballs = new DynamicMetaballs();

    return metaballs;
  }
}
