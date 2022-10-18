export interface MetaballStateInterface {
  x: number;
  y: number;
  r: number;

  angleStart?: number;
  angleEnd?: number;

  bg?: string;
  color?: string;
}

export interface MetaballInterface {
  ctx: CanvasRenderingContext2D;
  state: MetaballStateInterface;
}

export class Metaball implements MetaballInterface {
  ctx: MetaballInterface['ctx'];

  state: MetaballInterface['state'];

  constructor({ctx, state}: MetaballInterface) {
    this.ctx = ctx;

    this.state = {
      ...state,
      angleStart: 0,
      angleEnd: Math.PI * 2,
    };
  }

  setState(nowState: Partial<MetaballStateInterface>) {
    this.state = {
      ...this.state,
      ...nowState,
    };
  }

  render() {
    if (
      typeof this.state.angleStart !== 'number' ||
      typeof this.state.angleEnd !== 'number'
    ) {
      return;
    }

    this.ctx.beginPath();

    this.ctx.fillStyle = this.state.bg ?? '';
    this.ctx.strokeStyle = this.state.color ?? '';

    this.ctx.arc(
      this.state.x,
      this.state.y,
      this.state.r,
      this.state.angleStart,
      this.state.angleEnd,
    );

    this.ctx.closePath();
  }
}
