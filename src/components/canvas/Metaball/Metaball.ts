import {getAngle, getDist, getRandom, PIH} from '~/src/utils/math';

interface MetaballPropInterface {
  x: number;
  y: number;
  r: number;
  v: [number, number];
}

interface MetaballStateInterface extends MetaballPropInterface {}

interface MetaballInterface {
  state: MetaballStateInterface;
}

interface UpdateReturnTypeInterface {
  p1: [number, number];
  h1: [number, number];
  cmpH1: [number, number];
  cmpP1: [number, number];
  cmpP2: [number, number];
  cmpH2: [number, number];
  h2: [number, number];
  p2: [number, number];
}

export class Metaball implements MetaballInterface {
  state: MetaballStateInterface;

  constructor({x, y, r}: Pick<MetaballPropInterface, 'x' | 'y' | 'r'>) {
    this.state = {
      x,
      y,
      r,
      v: [
        getRandom(0, 1, {allowNagative: true}),
        getRandom(0, 1, {allowNagative: true}),
      ],
    };
  }

  get x() {
    return this.state.x;
  }

  get y() {
    return this.state.y;
  }

  get r() {
    return this.state.r;
  }

  get v() {
    return this.state.v;
  }

  update(cmp: Metaball): null | UpdateReturnTypeInterface {
    const {x: cmpX, y: cmpY, r: cmpR} = cmp;

    const dist = getDist(this.x, this.y, cmpX, cmpY);
    const maxDist = this.r + cmpR * 2.5;

    if (
      this.r === 0 ||
      cmpR === 0 ||
      dist > maxDist ||
      dist <= Math.abs(this.r - cmpR)
    ) {
      return null;
    }

    /**
     * @descriptions
     * 결국 원의 확산(메타볼의 끈적이는 특성)을 어디까지 할 수 있겠는가를 정의한다.
     * 이때 필요한 건, 최소거리를 잇는 선과 접점이 이루는 각이다.
     * 이를 구하는 공식이 바로 Math.acos((this.r - cmpR) / dist)다.
     *
     * @see: http://www.ezformula.net/esne/aboard/m_Fcontents_viewer.php?fcode=1113176&bgrcode=1021&mgrcode=1158&fupman=metalheart
     */
    const maxSpread = Math.acos((this.r - cmpR) / dist);

    /**
     * Paper.js metaball의 경우 실제로 0.5로 설정했다고 합니다.
     *
     * @see: http://paperjs.org/examples/meta-balls/
     */
    const v = 0.5;

    const isOverlapping = dist < this.r + cmpR;

    const squaredR = this.r ** 2;
    const squaredCmpR = cmpR ** 2;
    const squaredDist = dist ** 2;

    const u = isOverlapping
      ? Math.acos((squaredR + squaredDist - squaredCmpR) / (2 * this.r * dist))
      : 0;
    const cmpU = isOverlapping
      ? Math.acos((squaredCmpR + squaredDist - squaredR) / (2 * cmpR * dist))
      : 0;

    const angleBetweenCenters = getAngle(cmpX, cmpY, this.x, this.y, {});

    const spreadV = u + (maxSpread - u) * v;
    const cmpSpreadV = Math.PI - cmpU - (Math.PI - cmpU - maxSpread) * v;

    /**
     * 접점에 대한 원의 각 각도를 구한다.
     * 이는 기존에 위치 차로 형성되어 있던 각도에다가, 최대 확산 각도를 반영한 값이다.
     */
    const angle1 = angleBetweenCenters + spreadV;
    const angle2 = angleBetweenCenters - spreadV;
    const cmpAngle1 = angleBetweenCenters + cmpSpreadV;
    const cmpAngle2 = angleBetweenCenters - cmpSpreadV;

    const p1 = this.getVector(this.x, this.y, angle1, this.r);
    const p2 = this.getVector(this.x, this.y, angle2, this.r);
    const cmpP1 = this.getVector(cmpX, cmpY, cmpAngle1, cmpR);
    const cmpP2 = this.getVector(cmpX, cmpY, cmpAngle2, cmpR);

    const handleSize = 2.4;

    const totalRadius = this.r + cmpR;

    const d2Base = Math.min(
      v * handleSize,
      getDist(...p1, ...cmpP1) / totalRadius,
    );

    // Take into account when circles are overlapping
    const handleDist = d2Base * Math.min(1, (dist * 2) / totalRadius);

    const handleR1 = this.r * handleDist;
    const handleR2 = cmpR * handleDist;

    const h1 = this.getVector(...p1, angle1 - PIH, handleR1);
    const h2 = this.getVector(...p2, angle2 + PIH, handleR1);
    const cmpH1 = this.getVector(...cmpP1, cmpAngle1 + PIH, handleR2);
    const cmpH2 = this.getVector(...cmpP2, cmpAngle2 - PIH, handleR2);

    return {
      p1,
      h1,
      cmpH1,
      cmpP1,
      cmpP2,
      cmpH2,
      h2,
      p2,
    };
  }

  renderCurve(
    ctx: CanvasRenderingContext2D,
    {p1, h1, cmpH1, cmpP1, cmpP2, cmpH2, h2, p2}: UpdateReturnTypeInterface,
  ) {
    ctx.beginPath();
    ctx.moveTo(...p1);

    ctx.bezierCurveTo(...h1, ...cmpH1, ...cmpP1);
    ctx.lineTo(...cmpP2);
    ctx.bezierCurveTo(...cmpH2, ...h2, ...p2);

    ctx.lineTo(...p1);

    ctx.closePath();

    ctx.fill();
  }

  getVector(
    x: number,
    y: number,
    angle: number,
    radius: number,
  ): [number, number] {
    return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
  }

  render(
    ctx: CanvasRenderingContext2D,
    startAngle: number = 0,
    endAngle: number = Math.PI * 2,
  ) {
    ctx.arc(this.state.x, this.state.y, this.state.r, startAngle, endAngle);
    ctx.fill();
  }
}
