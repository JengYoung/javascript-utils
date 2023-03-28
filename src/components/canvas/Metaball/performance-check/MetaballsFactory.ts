import {DynamicMetaball, StaticMetaball} from './Metaball';

import {DynamicMetaballs, StaticMetaballs} from './Metaballs';

import {
  IPushMetaballPayload,
  TDynamicMetaballDataset,
  TStaticMetaballDataset,
} from './types';

export abstract class MetaballsFactory<T> {
  abstract createMetaballs(): T;

  abstract createMetaballByCount(
    metaballs: T,
    {
      options,
    }: IPushMetaballPayload<TStaticMetaballDataset | TDynamicMetaballDataset>,
  ): void;

  create(
    options: IPushMetaballPayload<
      TStaticMetaballDataset | TDynamicMetaballDataset
    >,
  ) {
    const metaballs = this.createMetaballs();

    this.createMetaballByCount(metaballs, options);

    return metaballs;
  }
}

export class StaticMetaballsFactory extends MetaballsFactory<StaticMetaballs> {
  constructor() {
    super();
  }

  createMetaballByCount(
    metaballs: StaticMetaballs,
    {options}: IPushMetaballPayload<TStaticMetaballDataset>,
  ) {
    if (options.data) {
      options.data.forEach(data => {
        metaballs.push(new StaticMetaball({ctx: options.ctx, ...data}));
      });
    }
  }

  createMetaballs(): StaticMetaballs {
    const metaballs = new StaticMetaballs();

    return metaballs;
  }

  create(
    options: IPushMetaballPayload<TStaticMetaballDataset>,
  ): StaticMetaballs {
    return super.create(options);
  }
}

export class DynamicMetaballsFactory extends MetaballsFactory<DynamicMetaballs> {
  constructor() {
    super();
  }

  createMetaballByCount(
    metaballs: DynamicMetaballs,
    {options}: IPushMetaballPayload<TDynamicMetaballDataset>,
  ) {
    if (options.data) {
      options.data.forEach(data => {
        metaballs.push(new DynamicMetaball({ctx: options.ctx, ...data}));
      });
    }
  }

  createMetaballs(): DynamicMetaballs {
    const metaballs = new DynamicMetaballs();

    return metaballs;
  }

  create(
    options: IPushMetaballPayload<TDynamicMetaballDataset>,
  ): DynamicMetaballs {
    return super.create(options);
  }
}
