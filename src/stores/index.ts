import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import app from './app';
import recommend from './recommend';

Vue.use(Vuex);

export default new Store({
    modules: {
        app: app,
        recommend: recommend
    }
});