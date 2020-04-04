import Vue from 'vue';
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
import App from './pages/app.vue';
import routers from './routers';
import stores from './stores';
import '@/assets/iconfont/iconfont.css';
import '@/assets/style.css';
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueTouch, { name: 'v-touch' });

const router = new VueRouter({
    routes: routers
});

new Vue({
    router: router,
    store: stores,
    render: h => h(App)
}).$mount('#root');