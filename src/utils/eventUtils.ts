interface OriginPosition {
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
}

/**
 * 触摸结果
 */
interface TouchResult {
    /**
     * 滑动方向
     */
    direction: number;

    /**
     * 滑动速度
     */
    speed: number;

    /**
     * 滑动距离
     */
    distance: number;
}

export class SwipeContext {

    private touching: boolean;

    public originPosition: OriginPosition;

    private startTime: number;

    public constructor(event: TouchEvent) {
        let changedTouches = event.changedTouches;
        if (changedTouches.length > 1) {
            this.touching = false;
        } else {
            this.touching = true;
            let touchEvent = changedTouches[0];
            let element = event.currentTarget as HTMLElement;
            this.originPosition = {
                x: touchEvent.clientX,
                y: touchEvent.clientY,
                scrollLeft: element.scrollLeft,
                scrollTop: element.scrollTop
            };
            this.startTime = new Date().getTime();
        }
    }

    /**
     * 计算滑动过程
     * 左滑0
     * 右滑1
     * 上滑2
     * 下滑3
     * @param event 
     */
    public clac(event: TouchEvent): TouchResult {
        if (!this.touching) {
            return null;
        }
        let touchEvent = event.changedTouches[0];
        let lastX = touchEvent.clientX;
        let lastY = touchEvent.clientY;
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
                    direction: 0,
                    speed: horizontalDistance / allTime,
                    distance: horizontalDistance
                };
            } else {
                return {
                    direction: 1,
                    speed: horizontalDistance / allTime,
                    distance: horizontalDistance
                };
            }
        } else {
            if (vertical < 0) {
                return {
                    direction: 2,
                    speed: verticalDistance / allTime,
                    distance: verticalDistance
                };
            } else {
                return {
                    direction: 3,
                    speed: verticalDistance / allTime,
                    distance: verticalDistance
                };
            }
        }
    }
}