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
}

export class Metaballs {
  arr: MetaballsInterface['arr'];

  ctx: MetaballsInterface['ctx'];

  state: MetaballsInterface['state'];

  constructor({ctx, state}: MetaballsArgsInterface) {
    this.ctx = ctx;
    this.state = state;

    this.arr = [];
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
