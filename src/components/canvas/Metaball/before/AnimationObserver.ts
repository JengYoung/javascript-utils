import {StaticMetaballs, DynamicMetaballs} from './Metaballs';

export abstract class MetaballsAnimationObserver {
  public abstract metaballs: StaticMetaballs | DynamicMetaballs;

  public abstract update(): void;
}

export class StaticMetaballsObserver implements MetaballsAnimationObserver {
  constructor(public metaballs: StaticMetaballs, public key: string) {}

  update() {
    this.metaballs.moveAll();
  }
}

export class DynamicMetaballsObserver implements MetaballsAnimationObserver {
  constructor(public metaballs: DynamicMetaballs, public key: string) {}

  update() {
    this.metaballs.moveAll();
  }
}
