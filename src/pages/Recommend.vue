<template>
    <list-item :data="personInfos">
        <template v-slot:content="content">
            <div class="p-image-container">
                <img :src="content.item.image" />
            </div>
            <div class="p-info-container">
                <p class="p-name">{{ content.item.name }}</p>
                <p class="p-age-area">
                    <span class="p-age vuelove" :class="[content.item.sex === 0 ? 'icon-sexm' : 'icon-sexw']">{{ content.item.age }}</span>
                    <span class="p-area icon-location vuelove">{{ content.item.provincialArea }}</span>
                </p>
                <p class="p-remark">{{ content.item.remark }}</p>
            </div>
            <div class="status-follow">
                <span class="status vuelove" :class="{ 'icon-dot': content.item.status === 0 }">{{ content.item.status === 0 ? '在线' : '刚刚在线' }}</span>
                <span class="follow vuelove" :class="[content.item.isFollow? 'icon-messgeinfo' : 'icon-follow']"></span>
            </div>
        </template>
    </list-item>
</template>

<style>
.p-age-area>span {
    display: inline-block;
    width: 50px;
    height: 18px;
    border-radius: 15px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
}

.p-image-container, .status-follow {
    flex-grow: 0;
    flex-shrink: 0;
}

.p-image-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #ff80bf;
}

.status-follow {
    width: 60px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.status-follow>.status {
    font-size: 12px;
    color: #b3b3cc;
    display: flex;
    align-items: center;
}

.p-info-container {
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.p-name {
    color: #000;
}

.p-remark {
    color: #b3b3cc;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.p-age {
    background-color: #ff33ff;
}

.p-area {
    background-color: #33adff;
}

.status.icon-dot::before {
    color: #33ff33;
    font-size: 24px;
}

.follow.icon-follow {
    font-size: 36px;
}

.follow.icon-messgeinfo {
    font-size: 28px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ListItem from '../components/ListItem.vue';
import { mapState } from 'vuex';
import { requestPerInfosArgs } from '../stores/recommend';

Component.registerHooks([
    "created"
]);
@Component({
    components: {
        'list-item': ListItem
    },
    computed: mapState({
        personInfos: (state: ModuleState) => {
            let personInfos = state.recommend.personInfos;
            return state.recommend.personInfos;
        }
    })
})
export default class Recommend extends Vue {

    public created(): void {
        let dispatch = this.$store.dispatch;
        let args: requestPerInfosArgs = {
            index: 0,
            count: 10
        };
        dispatch(ActionType.RequestPersonInfos, args);
    }
}
</script>