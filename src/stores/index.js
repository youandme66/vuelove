import Vue from 'vue';
import Vuex from 'vuex';
import MODULE_TYPE from './module-type';
import app from './app';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        [MODULE_TYPE.APP]: app
    }
});