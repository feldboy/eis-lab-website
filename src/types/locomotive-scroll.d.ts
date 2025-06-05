declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    scrollbarContainer?: HTMLElement | string;
    scrollFromAnywhere?: boolean;
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    tablet?: {
      smooth?: boolean;
      direction?: 'vertical' | 'horizontal';
    };
    smartphone?: {
      smooth?: boolean;
      direction?: 'vertical' | 'horizontal';
    };
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    init(): void;
    update(): void;
    start(): void;
    stop(): void;
    scrollTo(target: HTMLElement | string | number, options?: any): void;
    destroy(): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
  }
}
