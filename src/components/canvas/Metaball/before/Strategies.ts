import {getAngle, getDist, PIH} from '~/src/utils/math';
import {shouldFuse} from './libs/fuseByForce';
import {DynamicMetaball, StaticMetaball} from './Metaball';
import {Canvas} from './types';

abstract class Strategy {
  abstract exec(...args: unknown[]): void;

  abstract before?: (...args: unknown[]) => void;

  abstract after?: (...args: unknown[]) => void;
}

export class MoveStrategy implements Strategy {
  before?: (...args: unknown[]) => void;

  after?: (...args: unknown[]) => void;

  constructor() {}

  setBefore(callback: (...args: unknown[]) => void) {
    this.before = callback.bind(this);
  }

  setAfter(callback: (...args: unknown[]) => void) {
    this.after = callback.bind(this);
  }

  exec(metaball: DynamicMetaball) {
    // console.log('this: ', metaball, this);
    this.before?.();

    const {
      x,
      y,
      r,
      v: {x: vx, y: vy},
    } = metaball;

    metaball.setX(x + vx);
    metaball.setY(y + vy);

    const ctx = metaball.getCtx();

    const shouldChangeXDirection = () => {
      return (x - r <= 0 && vx < 0) || (x + r >= ctx.canvas.width && vx > 0);
    };

    const shouldChangeYDirection = () => {
      return (y + r >= ctx.canvas.height && vy > 0) || (y - r <= 0 && vy < 0);
    };

    if (shouldChangeXDirection()) {
      metaball.setVx(metaball.vx * -1);
    }

    if (shouldChangeYDirection()) {
      metaball.setVy(metaball.vy * -1);
    }

    metaball.draw();

    this.after?.();
  }
}

export class DrawStrategy implements Strategy {
  before?: (...args: unknown[]) => void;

  after?: (...args: unknown[]) => void;

  constructor() {}

  setBefore(callback: (...args: unknown[]) => void) {
    this.before = callback.bind(this);
  }

  setAfter(callback: (...args: unknown[]) => void) {
    this.after = callback.bind(this);
  }

  exec(metaball: DynamicMetaball) {
    this.before?.();

    const ctx = metaball.getCtx();

    const {x, y, r} = metaball;

    // ctx.save();

    ctx.beginPath();

    ctx.fillStyle = '#ffaa00';
    ctx.strokeStyle = '#ffaa00';

    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.closePath();

    ctx.fill();

    // ctx.restore();

    this.after?.();
  }
}

export class FuseStrategy implements Strategy {
  before?: (...args: unknown[]) => void;

  after?: (...args: unknown[]) => void;

  constructor() {}

  setBefore(callback: (...args: unknown[]) => void) {
    this.before = callback.bind(this);
  }

  setAfter(callback: (...args: unknown[]) => void) {
    this.after = callback.bind(this);
  }

  exec(ctx: Canvas['ctx'], balls: (DynamicMetaball | StaticMetaball)[]) {
    this.before?.();

    const {innerWidth, innerHeight} = window;

    for (let cx = 0; cx < innerWidth; cx += 1) {
      for (let cy = 0; cy < innerHeight; cy += 1) {
        if (shouldFuse(balls, cx, cy)) {
          ctx.fillStyle = '#ffaa00';
          ctx.fillRect(cx, cy, 1, 1);
        }
      }
    }

    this.after?.();
  }
}

export class OptimizedFuseStrategy implements Strategy {
  before?: (...args: unknown[]) => void;

  after?: (...args: unknown[]) => void;

  constructor(public fuseWeight: number = 1.2) {}

  setBefore(callback: (...args: unknown[]) => void) {
    this.before = callback.bind(this);
  }

  setAfter(callback: (...args: unknown[]) => void) {
    this.after = callback.bind(this);
  }

  setFuseWeight(weight: number) {
    this.fuseWeight = weight;
  }

  exec(ctx: Canvas['ctx'], balls: (DynamicMetaball | StaticMetaball)[]) {
    for (let i = 0; i < balls.length; i += 1) {
      const nowBall = balls[i];

      for (let j = 0; j < balls.length; j += 1) {
        const cmpBall = balls[j];

        this.fuse(ctx, nowBall, cmpBall);
      }
    }
  }

  getVector(
    x: number,
    y: number,
    angle: number,
    radius: number,
  ): [number, number] {
    return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
  }

  fuse(
    ctx: Canvas['ctx'],
    ball1: DynamicMetaball | StaticMetaball,
    ball2: DynamicMetaball | StaticMetaball,
  ) {
    const {x: x1, y: y1, r: r1} = ball1;
    const {x: x2, y: y2, r: r2} = ball2;

    /**
     * @see: https://github.com/paperjs/paper.js/blob/develop/examples/Paperjs.org/MetaBalls.html
     */
    const v = 0.5;
    const handleLength = 2.4;

    const totalRadiusSum = r1 + r2;

    const dist = getDist(x1, y1, x2, y2);
    const maxDist = totalRadiusSum * this.fuseWeight;

    if (dist >= maxDist) {
      return;
    }

    const maxSpread = Math.acos((r1 - r2) / dist);

    const isOverlapping = dist < totalRadiusSum;

    const squaredR1 = r1 ** 2;
    const squaredR2 = r2 ** 2;
    const squaredDist = dist ** 2;

    /**
     * @description
     * 내접하는 각 메타볼의 가운데와 접점을 이어 삼각형을 만들었을 때, 해당 각도를 구하는 공식.
     * 세 변을 알 수 있다면 각도를 구할 수 있다.
     * @see: https://en.wikipedia.org/wiki/Law_of_cosines
     */
    const u1 = isOverlapping
      ? Math.acos((squaredDist + squaredR1 - squaredR2) / (2 * r1 * dist))
      : 0;

    const u2 = isOverlapping
      ? Math.acos((squaredDist + squaredR2 - squaredR1) / (2 * r2 * dist))
      : 0;

    /**
     * @description
     * 결국 두 원의 중심 간에 애초에 존재하던 각도를 베이스로 잡기 위해 정의한다.
     */
    const baseAngle = getAngle(x2, y2, x1, y1);

    const spreadV1 = u1 + (maxSpread - u1) * v;
    const spreadV2 = Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;

    const angle1a = baseAngle + spreadV1;
    const angle1b = baseAngle - spreadV1;

    const angle2a = baseAngle + spreadV2;
    const angle2b = baseAngle - spreadV2;

    const p1a = this.getVector(x1, y1, angle1a, r1);
    const p1b = this.getVector(x1, y1, angle1b, r1);
    const p2a = this.getVector(x2, y2, angle2a, r2);
    const p2b = this.getVector(x2, y2, angle2b, r2);

    const baseHandleDist =
      Math.min(v * handleLength, getDist(...p1a, ...p2a) / totalRadiusSum) *
      Math.min(1, (dist * 2) / totalRadiusSum);

    const handleRadius1 = r1 * baseHandleDist;
    const handleRadius2 = r2 * baseHandleDist;

    const h1a = this.getVector(...p1a, angle1a - PIH, handleRadius1);
    const h1b = this.getVector(...p1b, angle1b + PIH, handleRadius1);
    const h2a = this.getVector(...p2a, angle2a + PIH, handleRadius2);
    const h2b = this.getVector(...p2b, angle2b - PIH, handleRadius2);

    ctx.beginPath();

    ctx.moveTo(...p1a);

    ctx.bezierCurveTo(...h1a, ...h2a, ...p2a);
    ctx.lineTo(...p2b);
    ctx.bezierCurveTo(...h2b, ...h1b, ...p1b);

    ctx.closePath();

    ctx.fill();
  }
}
