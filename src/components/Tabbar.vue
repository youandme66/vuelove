<template>
    <ul class="app-tabbar" v-on:click='selectChange'>
        <li v-for="(item, index) of data.tabs" class="app-tabbar-item" :id="item.id" :class="{active: item.id === data.currentTab}">
            <slot name="content" :item="item"></slot>
        </li>
    </ul>
</template>

<style>
.app-tabbar {
    width: 100%;
    height: 52px;
    border-top: 0.5px solid #f8f8f8;
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    user-select: none;
}
.app-tabbar-item {
    list-style: none;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: center;
}

.app-tabbar-item.active {
    background-color: aliceblue;
}
</style>

<script lang='ts'>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
@Component
export default class Tabbar extends Vue {
    @Prop({ type: Object, required: true }) data: TabsInfo;

    private selectChange(e: MouseEvent): void {
        let srcElement = e.srcElement as HTMLElement;
        let tabbarItem = srcElement.closest('.app-tabbar-item');
            if (tabbarItem) {
                let id = tabbarItem.id;
                this.$emit('select-change', id);
            }
    }
}
</script>