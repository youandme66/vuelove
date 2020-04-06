import { GetterTree, ActionTree, MutationTree, Module } from "vuex";
import { getPersonInfos } from "../api/recommend";

const state: RecommendState = {
    personInfos: []
};

const getters: GetterTree<RecommendState, JSONObject> = {
};

export interface requestPerInfosArgs {
    // 页数
    index: number;
    // 数量
    count: number;
}

const actions: ActionTree<RecommendState, JSONObject> = {
    [ActionType.RequestPersonInfos]: function({ commit, state }, args: requestPerInfosArgs): void {
        getPersonInfos(args.index, args.count).then(personInfos => {
            commit(MutationType.AddPersonInfos, personInfos);
        }).catch(() => {
            console.log('请求失败');
        })
    }
};

const mutations: MutationTree<RecommendState> = {
    [MutationType.AddPersonInfos]: function(state: RecommendState, personInfos: Array<PersonInfo>): void {
        let infos = state.personInfos;
        infos.push(...personInfos);
    }
}



const module: Module<RecommendState, JSONObject> = {
    state,
    getters,
    actions,
    mutations
};

export default module;