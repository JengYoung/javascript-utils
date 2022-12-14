import {Metaball} from '.';

export interface MetaballsStateInterface {
  ballCnt: number;
}

export interface MetaballsArgsInterface {
  ctx: CanvasRenderingContext2D;
  state: MetaballsStateInterface;
}

export interface MetaballsInterface extends MetaballsArgsInterface {
  arr: Metaball[];
  moveCnt: number;
}

export class Metaballs {
  arr: MetaballsInterface['arr'];

  ctx: MetaballsInterface['ctx'];

  state: MetaballsInterface['state'];

  moveCnt: MetaballsInterface['moveCnt'];

  constructor({ctx, state}: MetaballsArgsInterface) {
    this.ctx = ctx;
    this.state = state;

    this.arr = [];

    this.moveCnt = 0;
  }

  get moveCntRadian() {
    return this.moveCnt * (Math.PI / 180);
  }

  move() {
    const res = Math.sin(this.moveCntRadian);
    this.arr[0].setState({
      x: this.arr[0].state.x + res,
      y: this.arr[0].state.y + res,
    });

    this.arr[1].setState({
      x: this.arr[1].state.x - res,
      y: this.arr[1].state.y - res,
    });

    this.moveCnt += 2;
  }

  render() {
    this.arr.push(
      new Metaball({
        ctx: this.ctx,
        state: {
          x: 200,
          y: 200,
          r: 40,

          bg: '#752bed',
          color: 'black',
        },
      }),

      new Metaball({
        ctx: this.ctx,
        state: {
          x: 325,
          y: 325,
          r: 100,

          bg: '#752bed',
          color: 'black',
        },
      }),
    );
  }
}
