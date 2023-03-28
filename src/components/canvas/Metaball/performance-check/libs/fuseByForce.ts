import {DynamicMetaball, StaticMetaball} from '../Metaball';

export function shouldFuse(
  balls: (DynamicMetaball | StaticMetaball)[],
  cx: number,
  cy: number,
) {
  const total = balls.reduce((forceSum, ball) => {
    const {x, y, r} = ball;

    const acc = forceSum + r ** 2 / ((cx - x) ** 2 + (cy - y) ** 2);
    return acc;
  }, 0);

  return total >= 1;
}
