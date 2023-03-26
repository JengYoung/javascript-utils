import {StaticMetaballs, DynamicMetaballs} from './Metaballs';
import {DrawStrategy, MoveStrategy} from './Strategies';
import {EMetaballObserverKeys} from './types';

export abstract class MetaballsAnimationObserver {
  public abstract key: string | EMetaballObserverKeys;

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

  updateMoveStrategy(moveStrategy: MoveStrategy) {
    this.metaballs.setMoveStrategy(moveStrategy);
  }

  updateDrawStrategy(drawStrategy: DrawStrategy) {
    this.metaballs.setDrawStrategy(drawStrategy);
  }

  update() {
    this.metaballs.moveAll();
  }
}
