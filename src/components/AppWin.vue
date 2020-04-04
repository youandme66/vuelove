<template>
  <div class="app-win">
    <div class="header">
      <tabbar :data="data" v-on:select-change="onSelectChange">
        <template v-slot:content="content">
          <span>{{content.item.caption}}</span>
        </template>
      </tabbar>
    </div>
    <div
      class="app-win-outer"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
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
  /* overflow: hidden; */
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
</style>

<script>
import Tabbar from "./Tabbar.vue";
import { SwipeContext } from "../utils/eventUtils.js";
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    tabbar: Tabbar
  },
  methods: {
    onSelectChange: function(id) {
      this.$store.commit("updateCurrentTab", {
        parentId: this.data.parentId,
        id: id
      });
      let index = this.getIndex(id);
      let element = this.$el.querySelector('.app-win-outer');
      let scrollDistance = index * element.clientWidth;
      element.scrollLeft = scrollDistance;
    },
    getIndex: function(id) {
      let tabs = this.data.tabs;
      return tabs.findIndex(tab => tab.id === id);
    },
    onTouchStart: function(event) {
      this.swipeContext = new SwipeContext(event);
    },
    onTouchMove: function(event) {
      let swipeContext = this.swipeContext;
      let result = swipeContext.clac(event);
      if (!result) {
        return;
      }
      let direction = result.direction;
      let distance = result.distance;
      let element = event.currentTarget;
      let scrollLeft = swipeContext.originPosition.scrollLeft;
      let scrollWidth = element.scrollWidth - element.clientWidth;
      switch (direction) {
        // 左滑
        case 0: {
          event.preventDefault();
          let scrollDistance = scrollLeft + distance;
          if (scrollDistance > scrollWidth) {
            element.scrollLeft = scrollWidth;
          } else {
            element.scrollLeft = scrollDistance;
          }
          break;
        }
        // 右滑
        case 1: {
          event.preventDefault();
          let scrollDistance = scrollLeft - distance;
          if (scrollDistance > 0) {
            element.scrollLeft = scrollDistance;
          } else {
            element.scrollLeft = 0;
          }
          break;
        }
        // 上滑
        case 2: {
          break;
        }
        // 下滑
        case 3: {
          break;
        }
      }
    },
    onTouchEnd: function(event) {
      let swipeContext = this.swipeContext;
      let result = this.swipeContext.clac(event);
      if (!result) {
        return;
      }
      let direction = result.direction;
      let distance = result.distance;
      let speed = result.speed;
      let element = event.currentTarget;
      let scrollLeft = swipeContext.originPosition.scrollLeft;
      let clientWidth = element.clientWidth;
      let scrollWidth = element.scrollWidth - element.clientWidth;
      let canLeave = distance > clientWidth / 2 || speed > 0.7;
      switch (direction) {
        // 左滑
        case 0: {
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
        case 1: {
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
        case 2: {
          console.log("上滑");
          break;
        }
        // 下滑
        case 3: {
          console.log("下滑");
          break;
        }
      }
    }
  },
  computed: {
    tabs: function() {
      return this.data.tabs;
    }
  }
};
</script>