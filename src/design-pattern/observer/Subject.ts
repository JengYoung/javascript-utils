import {Observer} from './Observer';

export abstract class Subject {
  public abstract observers: Observer[];

  public abstract subscribe(observer: Observer): void;

  public abstract unSubscribe(observer: Observer): void;

  public abstract notify(): void;
}
