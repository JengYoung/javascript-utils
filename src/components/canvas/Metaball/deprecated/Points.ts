import {Point} from './Point';

export interface PointsArgsInterface {
  width: number;
  height: number;
  gapWeight: number;
}
export interface PointsInterface extends PointsArgsInterface {
  points: Point[];
}

export class Points implements PointsInterface {
  width: number;

  height: number;

  gapWeight: number;

  points: Point[];

  constructor({width, height, gapWeight}: PointsArgsInterface) {
    this.width = width;
    this.height = height;
    this.gapWeight = gapWeight;

    this.points = [];

    this.init();
  }

  get rowLength() {
    return this.width / this.gapWeight;
  }

  get colLength() {
    return this.height / this.gapWeight;
  }

  init() {
    for (let i = 0; i < this.rowLength; i += 1) {
      for (let j = 0; j < this.colLength; j += 1) {
        this.points.push(
          new Point({x: i * this.gapWeight, y: j * this.gapWeight}),
        );
      }
    }
  }
}
