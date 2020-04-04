export class SwipeContext {

    constructor(event) {
        let changedTouches = event.changedTouches;
        if (changedTouches.length > 1) {
            this.touching = false;
        } else {
            this.touching = true;
            let touchEvent = changedTouches[0];
            let element = event.currentTarget;
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
     * 左滑0
     * 右滑1
     * 上滑2
     * 下滑3
     * @param event 
     */
    clac(event) {
        if (!this.touching) {
            return;
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