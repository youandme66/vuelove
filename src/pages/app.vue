<template>
  <div id="app">
    <div class="app-container">
      <app-win
        v-for="(item, index) of tabInfo.tabs"
        :data="item.childrens"
        :key="index"
        v-show="item.id===tabInfo.currentTab"
      >
        <template v-slot:recommend v-if="item.id==='home'">
          <recommend></recommend>
        </template>
        <template v-slot:sameCity v-if="item.id==='home'">
          <same-city></same-city>
        </template>
        <template v-slot:blindDate v-if="item.id==='camera'">
          <blind-date></blind-date>
        </template>
        <template v-slot:makeFriends v-if="item.id==='camera'">
          <make-friends></make-friends>
        </template>
        <template v-slot:exclusive v-if="item.id==='camera'">
          <exclusive></exclusive>
        </template>
        <template v-slot:buddy v-if="item.id==='status'">
          <buddy></buddy>
        </template>
        <template v-slot:recommend v-if="item.id==='status'">
          <friend-recommend></friend-recommend>
        </template>
        <template v-slot:message v-if="item.id==='message'">
          <message></message>
        </template>
        <template v-slot:my v-if="item.id==='my'">
          <my></my>
        </template>
      </app-win>
    </div>
    <tabbar :data="tabInfo" v-on:select-change="onSelectChange">
      <template v-slot:content="data">
        <span class="vuelove tabbar-icon" v-bind:class="data.item.icon"></span>
        <span class="tabbar-text">{{data.item.caption}}</span>
      </template>
    </tabbar>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Tabbar from "../components/Tabbar.vue";
import Recommend from "./Recommend.vue";
import FriendRecommend from "./FriendRecommend.vue";
import Message from "./Message.vue";
import MakeFriends from "./MakeFriends.vue";
import My from "./My.vue";
import SameCity from "./SameCity.vue";
import BlindDate from "./BlindDate.vue";
import Exclusive from "./Exclusive.vue";
import Buddy from "./Buddy.vue";
import AppWin from "../components/AppWin.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    tabbar: Tabbar,
    "app-win": AppWin,
    recommend: Recommend,
    "friend-recommend": FriendRecommend,
    message: Message,
    "make-friends": MakeFriends,
    my: My,
    "same-city": SameCity,
    "blind-date": BlindDate,
    exclusive: Exclusive,
    buddy: Buddy
  },
  computed: mapState({
    tabInfo: (state: ModuleState) => {
      return state.app.tabInfo;
    }
  })
})
export default class App extends Vue {
  
  private onSelectChange(id: string): void {
    this.$store.commit("updateCurrentTab", {
      id: id
    });
  }
}
</script>

<style>
.tabbar-icon,
.tabbar-text {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.vuelove.tabbar-icon {
  font-size: 24px;
}
.active > .tabbar-icon {
  color: #ff0000;
}
.app-container {
  flex: 1;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>