export interface OriginPosition {
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
}

export const enum Direction {
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3
}

/**
 * 触摸结果
 */
export interface TouchResult {
    /**
     * 滑动方向
     */
    direction: Direction;

    /**
     * 滑动速度
     */
    speed: number;

    /**
     * 滑动距离
     */
    distance: number;


    originPosition?: OriginPosition;

    /**
     * 操作过程
     */
    process?: SwipeProcess;
}

export enum SwipeProcess {
    Move = 'move',

    End = 'end'
}

export interface TouchSwipeArgs {
    vue: TouchProvider;

    element: HTMLElement;
}

/**
 * 使用TouchSwipe必须实现的接口
 */
export interface TouchProvider extends Vue {
    /**
     * 在用户滑动时进行计算
     */
    touchSwipe: (result: TouchResult, event: MouseEvent) => void;

    /**
     * 在滑动后界面进行了resize
     */
    touchResize: (element: HTMLElement, event: Event) => void;
}

/**
 * 手势滚动
 * 仅限于局部指令
 */
export class TouchSwipe {

    private touching: boolean;

    private originPosition: OriginPosition;

    private startTime: number;

    private touchStartHandle: (event: MouseEvent | TouchEvent) => void;

    private touchMoveHandle: (event: MouseEvent | TouchEvent) => void;

    private touchEndHandle: (event: MouseEvent | TouchEvent) => void;

    private resizeHandler: (event: Event) => void;

    private element: HTMLElement;

    private currentVue: TouchProvider;

    public constructor(args: TouchSwipeArgs) {
        this.touchStartHandle = this.doTouchStart.bind(this);
        this.touchMoveHandle = this.doTouchMove.bind(this);
        this.touchEndHandle = this.doTouchEnd.bind(this);
        this.resizeHandler = this.doResize.bind(this);
        this.element = args.element;
        this.currentVue = args.vue;
        this.init_events();
    }

    private init_events(): void {
        let el = this.element;
        el.addEventListener('touchstart', this.touchStartHandle);
        el.addEventListener('mousedown', this.touchStartHandle);
        window.addEventListener('resize', this.resizeHandler);
    }

    public dispose(): void {
        let el = this.element;
        el.removeEventListener('touchstart', this.touchStartHandle);
        el.removeEventListener('touchmove', this.touchMoveHandle);
        el.removeEventListener('touchend', this.touchEndHandle);
        el.removeEventListener('mousedown', this.touchStartHandle);
        el.removeEventListener('mousemove', this.touchMoveHandle);
        el.removeEventListener('mouseup', this.touchEndHandle);
        window.removeEventListener('resize', this.resizeHandler);
    }

    private doTouchStart(event: MouseEvent | TouchEvent): void {
        let lastEvent: MouseEvent = event as MouseEvent;
        if (event instanceof TouchEvent) {
            let changedTouches = event.changedTouches;
            if (changedTouches.length > 1) {
                this.touching = false
                return;
            } else {
                lastEvent = changedTouches[0] as any;
            }
        }
        this.touching = true;
        let element = event.currentTarget as HTMLElement;
        this.originPosition = {
            x: lastEvent.clientX,
            y: lastEvent.clientY,
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        };
        this.startTime = new Date().getTime();
        element.addEventListener('touchmove', this.touchMoveHandle);
        element.addEventListener('mousemove', this.touchMoveHandle);
        element.addEventListener('touchend', this.touchEndHandle);
        element.addEventListener('mouseup', this.touchEndHandle);
    }

    /**
     * 计算触摸结果
     * @param event 
     */
    private clac(event: MouseEvent): TouchResult {
        let lastX = event.clientX;
        let lastY = event.clientY;
        let originPosition = this.originPosition;
        let originX = originPosition.x;
        let originY = originPosition.y;
        let nowTime = new Date().getTime();
        let startTime = this.startTime;
        let allTime = nowTime - startTime;
        let horizontal = lastX - originX;
        let vertical = lastY - originY;
        // 左滑: horizontal为负 右滑: horizontal为正
        // 下滑: vertical为正 上滑: vertical为负
        let horizontalDistance = Math.abs(horizontal);
        let verticalDistance = Math.abs(vertical);
        if (horizontalDistance > verticalDistance) {
            if (horizontal < 0) {
                return {
                    direction: Direction.Left,
                    speed: horizontalDistance / allTime,
                    distance: horizontalDistance
                };
            } else {
                return {
                    direction: Direction.Right,
                    speed: horizontalDistance / allTime,
                    distance: horizontalDistance
                };
            }
        } else {
            if (vertical < 0) {
                return {
                    direction: Direction.Up,
                    speed: horizontalDistance / allTime,
                    distance: horizontalDistance
                };
            } else {
                return {
                    direction: Direction.Down,
                    speed: horizontalDistance / allTime,
                    distance: horizontalDistance
                };
            }
        }
    }

    /**
     * 触摸中
     * @param event 
     */
    private doTouchMove(event: MouseEvent | TouchEvent): void {
        if (!this.touching) {
            return;
        }
        let lastEvent: MouseEvent = event as MouseEvent;
        if (event instanceof TouchEvent) {
            let changedTouches = event.changedTouches;
            lastEvent = changedTouches[0] as any;
        }
        let touchResult = this.clac(lastEvent);
        touchResult.process = SwipeProcess.Move;
        touchResult.originPosition = this.originPosition;
        let currentVue = this.currentVue;
        if (currentVue.touchSwipe) {
            currentVue.touchSwipe(touchResult, event as any);
        }
    }

    private doTouchEnd(event: MouseEvent | TouchEvent): void {
        if (!this.touching) {
            return;
        }
        let lastEvent: MouseEvent = event as MouseEvent;
        let currentVue = this.currentVue;
        if (event instanceof TouchEvent) {
            let changedTouches = event.changedTouches;
            lastEvent = changedTouches[0] as any;
        }
        let touchResult = this.clac(lastEvent);
        touchResult.process = SwipeProcess.End;
        touchResult.originPosition = this.originPosition;
        if (currentVue.touchSwipe) {
            currentVue.touchSwipe(touchResult, event as any);
        }
        this.touching = false;
        let el = this.element;
        el.removeEventListener('touchmove', this.touchMoveHandle);
        el.removeEventListener('touchend', this.touchEndHandle);
        el.removeEventListener('mousemove', this.touchMoveHandle);
        el.removeEventListener('mouseup', this.touchEndHandle);
    }

    /** @implements */
    private doResize(event: Event): void {
        requestAnimationFrame(() => {
            let currentVue = this.currentVue;
            if (currentVue.touchResize) {
                currentVue.touchResize(this.element, event);
            }
        });
    }
}