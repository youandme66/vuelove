<template>
  <div class="app-win">
    <div class="header">
      <tabbar :data="data" v-on:select-change="onSelectChange">
        <template v-slot:content="content">
          <span>{{content.item.caption}}</span>
        </template>
      </tabbar>
    </div>
    <div class="app-win-outer" v-touch-swipe>
      <ul class="app-win-container" :style="{ width:  tabs.length*100 + '%'}">
        <li v-for="(item, index) of tabs" :id="item.id" :style="{ width: 100 / tabs.length + '%' }">
          <slot :name="item.id"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.app-win {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.app-win-outer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-win-container {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.app-win-container>li {
  flex-shrink: 0;
  flex-grow: 0;
}
</style>

<script lang='ts'>
import Tabbar from "./Tabbar.vue";
import { SwipeContext } from "../utils/eventUtils";
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import {
  TouchSwipe,
  TouchResult,
  SwipeProcess,
  Direction,
  TouchProvider
} from "../directives/TouchSwipe";

@Component({
  components: {
    tabbar: Tabbar
  }
})
export default class AppWin extends Vue implements TouchProvider {
  @Prop({ type: Object, required: true }) data: TabsInfo;

  private onSelectChange(id: string): void {
    this.$store.commit("updateCurrentTab", {
      parentId: this.data.parentId,
      id: id
    });
    let index = this.getIndex(id);
    let element = this.$el.querySelector(".app-win-outer");
    let scrollDistance = index * element.clientWidth;
    element.scrollLeft = scrollDistance;
  }

  private getIndex(id: string): number {
    let tabs = this.data.tabs;
    return tabs.findIndex(tab => tab.id === id);
  }

  /** @implements */
  public touchSwipe(result: TouchResult, event: MouseEvent): void {
    let process = result.process;
    let direction = result.direction;
    let distance = result.distance;
    let element = event.currentTarget as HTMLElement;
    let scrollLeft = result.originPosition.scrollLeft;
    let scrollWidth = element.scrollWidth - element.clientWidth;
    if (process === SwipeProcess.Move) {
      switch (direction) {
        case Direction.Left: {
          event.preventDefault();
          let scrollDistance = scrollLeft + distance;
          if (scrollDistance > scrollWidth) {
            element.scrollLeft = scrollWidth;
          } else {
            element.scrollLeft = scrollDistance;
          }
          break;
        }
        case Direction.Right: {
          event.preventDefault();
          let scrollDistance = scrollLeft - distance;
          if (scrollDistance > 0) {
            element.scrollLeft = scrollDistance;
          } else {
            element.scrollLeft = 0;
          }
          break;
        }
        case Direction.Up: {
          break;
        }
        case Direction.Down: {
          break;
        }
      }
    } else if (process === SwipeProcess.End) {
      let speed = result.speed;
      let clientWidth = element.clientWidth;
      let canLeave = distance > clientWidth / 2 || speed > 0.7;
      switch (direction) {
        // 左滑
        case Direction.Left: {
          if (canLeave) {
            let scrollDistance = scrollLeft + clientWidth;
            let tabsLength = this.tabs.length;
            let index;
            if (scrollDistance > scrollWidth) {
              index = tabsLength - 1;
              element.scrollLeft = scrollWidth;
            } else {
              index = Math.round(scrollDistance / clientWidth);
              element.scrollLeft = scrollDistance;
            }
            this.$store.commit("updateCurrentTab", {
              parentId: this.data.parentId,
              id: this.tabs[index].id
            });
          } else {
            element.scrollLeft = scrollLeft;
          }
          break;
        }
        // 右滑
        case Direction.Right: {
          if (canLeave) {
            let scrollDistance = scrollLeft - clientWidth;
            let index;
            if (scrollDistance > 0) {
              index = Math.round(scrollDistance / clientWidth);
              element.scrollLeft = scrollDistance;
            } else {
              index = 0;
              element.scrollLeft = 0;
            }
            this.$store.commit("updateCurrentTab", {
              parentId: this.data.parentId,
              id: this.tabs[index].id
            });
          } else {
            element.scrollLeft = scrollLeft;
          }
          break;
        }
        // 上滑
        case Direction.Up: {
          console.log("上滑");
          break;
        }
        // 下滑
        case Direction.Down: {
          console.log("下滑");
          break;
        }
      }
    }
  }

  /** @implements */
  public touchResize(element: HTMLElement, event: Event): void {
    let currentTab = this.data.currentTab;
    let index = this.getIndex(currentTab);
    let scrollWidth = element.scrollWidth;
    let clientWidth = element.clientWidth;
    element.scrollLeft = index * clientWidth;
  }

  get tabs() {
    return this.data.tabs;
  }
}
</script>