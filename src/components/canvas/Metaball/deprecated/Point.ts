export interface PointInterface {
  x: number;
  y: number;
}

export class Point implements PointInterface {
  x: number;

  y: number;

  constructor({x, y}: PointInterface) {
    this.x = x;
    this.y = y;
  }
}
