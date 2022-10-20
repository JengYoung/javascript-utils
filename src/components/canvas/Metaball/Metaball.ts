import getRandom from '~/src/utils/math/getRandom';

interface MetaballPropInterface {
  x: number;
  y: number;
  r: number;
  v: number;
}

interface MetaballStateInterface extends MetaballPropInterface {}

interface MetaballInterface {
  state: MetaballStateInterface;
}

export class Metaball implements MetaballInterface {
  state: MetaballStateInterface;

  constructor({x, y, r}: Pick<MetaballPropInterface, 'x' | 'y' | 'r'>) {
    this.state = {
      x,
      y,
      r,
      v: getRandom(0, 1, {allowNagative: true}),
    };
  }

  render(
    ctx: CanvasRenderingContext2D,
    startAngle: number = 0,
    endAngle: number = Math.PI * 2,
  ) {
    ctx.arc(this.state.x, this.state.y, this.state.r, startAngle, endAngle);
  }
}
