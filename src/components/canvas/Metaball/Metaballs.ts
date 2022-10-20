import {Metaball} from './Metaball';

export interface MetaballsPropsInterface {
  num: number;
}

export interface MetaballsInterface extends MetaballsPropsInterface {
  // balls: Metaball[];
}

export class Metaballs implements MetaballsInterface {
  num: number;

  #balls: Metaball[] = [];

  constructor({num}: MetaballsPropsInterface) {
    this.num = num;

    this.init();
  }

  init() {
    const metaball1 = new Metaball({
      x: 200,
      y: 200,
      r: 150,
    });

    const metaball2 = new Metaball({
      x: 500,
      y: 500,
      r: 200,
    });

    this.#balls.push(metaball1, metaball2);
  }

  get balls() {
    return this.#balls;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.balls.forEach(ball => {
      ball.render(ctx);
    });
  }
}
