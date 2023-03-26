import {MoveStrategy} from './Strategies';
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
}

export interface IMetaballParams extends Canvas2DElement, IMetaballOptions {}

export interface IStaticMetaballParams extends IMetaballParams {}

export interface IDynamicMetaballParams
  extends Canvas2DElement,
    IDynamicMetaballOptions {}

/**
 * Canvas
 */

export interface CanvasShape {
  width: number;
  height: number;
}

export enum ECanvasGradientType {
  'linear' = 'linear',
  'radial' = 'radial',
}

export enum EMetaballObserverKeys {
  'dynamic' = 'dynamic',
  'static' = 'static',
}

export abstract class Canvas implements CanvasShape {
  abstract type: ECanvasGradientType;

  abstract $canvas: HTMLCanvasElement;

  abstract ctx: CanvasRenderingContext2D;

  abstract width: CanvasShape['width'];

  abstract height: CanvasShape['height'];

  abstract draw(background: CanvasGradient | string | CanvasPattern): void;

  abstract mount($target: Element): void;

  abstract render(): void;
}

export interface IRadialGradientOptions {
  r0?: number;
  r1?: number;
}

interface MetaballCanvasOptions {
  radialGradient?: IRadialGradientOptions;
  autoplay?: boolean;
  pause?: boolean;
}

export abstract class GradientCanvas extends Canvas {
  abstract gradients: string[];

  abstract options?: MetaballCanvasOptions;

  abstract draw(background: CanvasGradient): void;

  abstract getLinearGradient(): CanvasGradient;

  abstract getRadialGradient(options: IRadialGradientOptions): CanvasGradient;
}

/**
 * INFO: MetaballsFactory
 */

export interface IPushMetaballPayload<MetaballParams> {
  options: {
    ctx: Canvas2DElement['ctx'];
    data: MetaballParams;
  };
}

/**
 * INFO: App, Canvas
 */
export type TStaticMetaballDataset = Omit<IStaticMetaballParams, 'ctx'>[];
export type TDynamicMetaballDataset = Omit<IDynamicMetaballParams, 'ctx'>[];

export interface IMetaballDataset {
  static?: TStaticMetaballDataset;
  dynamic?: TDynamicMetaballDataset;
}

export interface IMetaballObserverKeys {
  key: EMetaballObserverKeys;
}

export interface IDynamicMetaballMoveStrategy extends IMetaballObserverKeys {
  key: EMetaballObserverKeys.dynamic;
  moveStrategy: MoveStrategy;
}
