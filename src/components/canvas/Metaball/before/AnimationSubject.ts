import {Observer} from '~/src/design-pattern/observer/Observer';
import {Subject} from '~/src/design-pattern/observer/Subject';

interface IAnimationSubjectParams {
  ctx: CanvasRenderingContext2D;
}

export class AnimationSubject implements Subject {
  ctx: CanvasRenderingContext2D;

  observers: Set<Observer>;

  constructor({ctx}: IAnimationSubjectParams) {
    this.ctx = ctx;
    this.observers = new Set<Observer>();
  }

  public subscribe(observer: Observer): void {
    this.observers.add(observer);
  }

  public unSubscribe(observer: Observer): void {
    this.observers.delete(observer);
  }

  public notify(): void {
    this.observers.forEach(observer => {
      observer.update();
    });
  }
}
