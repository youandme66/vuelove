import Vue from 'vue';
import App from './pages/app.vue';
import VueRouter from 'vue-router';
import routers from './routers';
import stores from './stores';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: routers
});

new Vue({
    router: router,
    store: stores,
    render: h => h(App)
}).$mount('#root');