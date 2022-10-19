export const RADIAN = 180 / Math.PI;
export const PIH = Math.PI / 2;

/**
 * @descriptions : 라디안 값을 degree 값으로 변환합니다.
 *
 * @param r : 라디안 값을 인수로 전달받습니다.
 * @return degree값을 반환합니다.
 */
export const getDegree = (r: number): number => r * RADIAN;

/**
 * @descriptions 한 좌표에 위치한 두 점 간의 거리를 반환합니다. 배열이 아님에 유의합시다.
 *
 * @param x1 좌표 1의 x
 * @param y1 좌표 1의 y
 * @param x2 좌표 2의 x
 * @param y2 좌표 2의 y
 *
 * @return 두 점 간의 거리를 반환합니다.
 */

export const getDist = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

/**
 * @descriptions
 * 두 점 간의 각도를 구하는 함수입니다.
 * 현재 대상 좌표를 앞에,
 * 비교할 대상을 뒤에 놓으면 됩니다.
 * 이는 `Math.atan2`를 응용하였습니다.
 *
 * @param x1 현재 대상 좌표 1의 x
 * @param y1 현재 대상 좌표 1의 y
 * @param x2 비교할 좌표 2의 x
 * @param y2 비교할 좌표 2의 y
 * @param radian 옵셔널하며,
 *
 * @return 두 점 간의 각도를 반환합니다.
 */
export const getAngle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  {radian = true}: {radian?: boolean},
) => Math.atan2(y2 - y1, x2 - x1) * (radian ? 1 : RADIAN);
