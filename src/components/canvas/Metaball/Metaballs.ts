import {Metaball} from './Metaball';

export interface MetaballsPropsInterface {
  ctx: CanvasRenderingContext2D;
  num: number;
  absorbBallNum: number;
  canvasWidth: number;
  canvasHeight: number;
}

export interface MetaballsInterface extends MetaballsPropsInterface {
  // balls: Metaball[];
  mainMetaball: Metaball;
}

export class Metaballs implements MetaballsInterface {
  ctx: CanvasRenderingContext2D;

  num: number;

  absorbBallNum: number;

  mainMetaball: Metaball;

  canvasWidth: number;

  canvasHeight: number;

  #bubbles: Metaball[] = [];

  #absorbedMetaBalls: Metaball[] = [];

  constructor({
    ctx,
    num,
    absorbBallNum,
    canvasWidth,
    canvasHeight,
  }: MetaballsPropsInterface) {
    this.ctx = ctx;

    this.num = num;
    this.absorbBallNum = absorbBallNum;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.mainMetaball = new Metaball({
      ctx: this.ctx,
      x: this.canvasWidth / 2,
      y: this.canvasHeight / 2,
      r: 300,
    });

    this.init();
  }

  init() {
    for (let i = 0; i < this.absorbBallNum; i += 1) {
      const metaball = new Metaball({
        ctx: this.ctx,
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2,
        r: 200,
      });

      this.#absorbedMetaBalls.push(metaball);
    }

    for (let i = 0; i < this.num; i += 1) {
      const metaball = new Metaball({
        ctx: this.ctx,
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2,
        r: 200,
      });

      this.#bubbles.push(metaball);
    }
  }

  get absorbedMetaBalls() {
    return this.#absorbedMetaBalls;
  }

  /**
   * @descriptions
   * mainMetaball을 제외한 나머지 메타볼들을 모두 합합니다.
   */
  get restMetaballs() {
    return [...this.#absorbedMetaBalls, ...this.#bubbles];
  }

  animate() {
    this.restMetaballs.forEach(ball => {
      ball.animate({
        x: this.mainMetaball.state.x,
        y: this.mainMetaball.state.y,
        r: this.mainMetaball.state.r,
      });
    });

    this.render(this.ctx);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.restMetaballs.forEach((ball, idx) => {
      ball.render(ctx);

      const mainMetaballPath = ball.update(this.mainMetaball);
      if (mainMetaballPath !== null) ball.renderCurve(mainMetaballPath);

      for (let i = idx + 1; i < this.restMetaballs.length; i += 1) {
        const nextBall = this.restMetaballs[i];

        // NOTE: update and render curve finally
        const paths = ball.update(nextBall);
        if (paths !== null) ball.renderCurve(paths);
      }
    });

    this.mainMetaball.render(ctx);
  }
}
