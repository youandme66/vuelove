import { GetterTree, ActionTree, MutationTree, Module } from "vuex";

const state: AppState = {
    tabInfo: {
        currentTab: 'home',
        tabs: [{
            id: 'home',
            icon: 'icon-home',
            caption: '主页',
            childrens: {
                currentTab: 'recommend',
                parentId: 'home',
                tabs: [{
                    id: 'recommend',
                    caption: '推荐'
                }, {
                    id: 'sameCity',
                    caption: '同城'
                }]
            }
        }, {
            id: 'camera',
            icon: 'icon-camera',
            caption: '相亲',
            childrens: {
                currentTab: 'blindDate',
                parentId: 'camera',
                tabs: [{
                    id: 'blindDate',
                    caption: '相亲'
                }, {
                    id: 'makeFriends',
                    caption: '交友'
                }, {
                    id: 'exclusive',
                    caption: '专属'
                }]
            }
        }, {
            id: 'status',
            icon: 'icon-status',
            caption: '动态',
            childrens: {
                currentTab: 'buddy',
                parentId: 'status',
                tabs: [{
                    id: 'buddy',
                    caption: '好友'
                }, {
                    id: 'friendRecommend',
                    caption: '推荐'
                }]
            }
        }, {
            id: 'message',
            icon: 'icon-message',
            caption: '消息',
            childrens: {
                currentTab: 'message',
                parentId: 'message',
                tabs: [{
                    id: 'message',
                    caption: '消息'
                }]
            }
        }, {
            id: 'my',
            icon: 'icon-my',
            caption: '我',
            childrens: {
                currentTab: 'my',
                parentId: 'my',
                tabs: [{
                    id: 'my',
                    caption: '我'
                }]
            }
        }]
    }
};

const getters: GetterTree<AppState, JSONObject> = {
};

const actions: ActionTree<AppState, JSONObject> = {

};

const mutations: MutationTree<AppState> = {
    updateCurrentTab: function (state, data) {
        let parentId = data.parentId;
        let id = data.id;
        if (parentId) {
            state.tabInfo.tabs.forEach((item: any) => {
                if (item.id === parentId) {
                    item.childrens.currentTab = id;
                }
            });
        } else {
            state.tabInfo.currentTab = id;
        }
    }
}

const module: Module<AppState, JSONObject> = {
    state,
    getters,
    actions,
    mutations
};

export default module;