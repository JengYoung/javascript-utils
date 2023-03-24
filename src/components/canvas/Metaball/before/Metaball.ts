import {
  IDynamicMetaballParams,
  IStaticMetaballParams,
  IXYWeight,
} from './types';

export abstract class Metaball {
  abstract ctx: CanvasRenderingContext2D;

  abstract x: number;

  abstract y: number;

  abstract r: number;

  abstract setX(value: number): void;

  abstract setY(value: number): void;

  abstract setR(value: number): void;
}

export class StaticMetaball implements Metaball {
  public ctx: CanvasRenderingContext2D;

  public x: number;

  public y: number;

  public r: number;

  constructor({ctx, x, y, r}: IStaticMetaballParams) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
  }

  setX(value: number) {
    this.x = value;
  }

  setY(value: number) {
    this.x = value;
  }

  setR(value: number) {
    this.x = value;
  }
}

export class DynamicMetaball implements Metaball {
  public ctx: CanvasRenderingContext2D;

  public x: number;

  public y: number;

  public r: number;

  public v: IXYWeight;

  public vWeight: number;

  constructor({ctx, x, y, r, v, vWeight}: IDynamicMetaballParams) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = v;
    this.vWeight = vWeight ?? 1;
  }

  get vx() {
    return this.v.x;
  }

  setX(value: number) {
    this.x = value;
  }

  setY(value: number) {
    this.x = value;
  }

  setR(value: number) {
    this.x = value;
  }

  setVx(value: number) {
    this.v.x = value;
  }

  get vy() {
    return this.v.y;
  }

  setVy(value: number) {
    this.v.y = value;
  }

  move() {}
}
