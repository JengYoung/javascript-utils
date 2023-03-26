import {DynamicMetaball, StaticMetaball} from './Metaball';
import {
  DynamicMetaballsObserver,
  MetaballsAnimationObserver,
} from './AnimationObserver';

import {
  IDynamicMetaballDrawStrategy,
  IDynamicMetaballMoveStrategy,
} from './types';

interface IAnimationSubjectParams {
  ctx: CanvasRenderingContext2D;
}

export abstract class MetaballsSubject {
  public abstract observers: Set<MetaballsAnimationObserver>;

  public abstract subscribe(observer: MetaballsAnimationObserver): void;

  public abstract unSubscribe(observer: MetaballsAnimationObserver): void;

  public abstract notify(): void;
}

export class AnimationSubject implements MetaballsSubject {
  ctx: CanvasRenderingContext2D;

  observers: Set<MetaballsAnimationObserver>;

  constructor({ctx}: IAnimationSubjectParams) {
    this.ctx = ctx;
    this.observers = new Set<MetaballsAnimationObserver>();
  }

  get allMetaballs() {
    const arr: (StaticMetaball | DynamicMetaball)[] = [];

    const allBalls = [...this.observers].map(observer => observer.metaballs);

    allBalls.forEach(balls => {
      arr.push(...balls.balls);
    });

    return arr;
  }

  public subscribe(observer: MetaballsAnimationObserver): void {
    this.observers.add(observer);
  }

  public unSubscribe(observer: MetaballsAnimationObserver): void {
    this.observers.delete(observer);
  }

  public notify(): void {
    this.observers.forEach(observer => {
      observer.update();
    });
  }

  public notifyUpdateMoveStrategy({
    moveStrategy,
    key,
  }: IDynamicMetaballMoveStrategy): void {
    this.observers.forEach(observer => {
      if (observer.key === key) {
        (observer as DynamicMetaballsObserver).updateMoveStrategy(moveStrategy);
        observer.update();
      }
    });
  }

  public notifyUpdateDrawStrategy({
    drawStrategy,
    key,
  }: IDynamicMetaballDrawStrategy): void {
    this.observers.forEach(observer => {
      if (observer.key === key) {
        (observer as DynamicMetaballsObserver).updateDrawStrategy(drawStrategy);
        observer.update();
      }
    });
  }
}
