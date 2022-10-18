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
          x: 25,
          y: 25,
          r: 40,
        },
      }),

      new Metaball({
        ctx: this.ctx,
        state: {
          x: 125,
          y: 125,
          r: 100,
        },
      }),
    );
  }
}
