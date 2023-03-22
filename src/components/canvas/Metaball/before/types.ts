import {IMoveStrategy} from '../Strategies/types';

/**
 * INFO: Common types
 */
export interface Canvas2DElement {
  ctx: CanvasRenderingContext2D;
}

export interface IXYWeight {
  x: number;
  y: number;
}

/**
 * INFO: Metaball types
 */
export interface IMetaballOptions extends IXYWeight {
  r: number;
}

export interface IDynamicMetaballOptions extends IMetaballOptions {
  v: IXYWeight;
  vWeight: number;
  moveStrategy: IMoveStrategy;
}

export interface IMetaballParams extends Canvas2DElement, IMetaballOptions {}

export interface IStaticMetaballParams extends IMetaballParams {}

export interface IDynamicMetaballParams
  extends Canvas2DElement,
    IDynamicMetaballOptions {}
