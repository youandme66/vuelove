<template>
    <ul class="list">
        <li class="list-item" v-for="(item, index) of data" :id="item.id">
            <slot name="content" :item="item"></slot>
        </li>
    </ul>
</template>

<style>
.list {
    height: 100%;
    overflow-y: auto;
    padding-left: 0px;
}
.list-item {
    border-bottom: 0.5px solid #f0f0f5;
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    cursor: pointer;
}

.list>.list-item:active {
    background-color: #cceeff;
}

.list-item:hover {
    background-color: #e5f7ff;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
    @Prop({ type: Array, required: true }) data: Array<JSONObject>;
}
</script>