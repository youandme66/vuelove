import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './pages/App.vue';
import routers from './routers';
import stores from './stores';
import '@/assets/iconfont/iconfont.css';
import '@/assets/style.css';
import { DirectiveBinding } from 'vue/types/options';
import { VNode } from 'vue/types/umd';
import { TouchSwipe, TouchProvider } from './directives/TouchSwipe';
Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    routes: routers
});

Vue.prototype.customObject = {};

Vue.directive('touch-swipe', {
    bind: (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
        let context = vnode.context as JSONObject;
        context.customObject.touchSwipe = new TouchSwipe({
            element: el,
            vue: vnode.context as TouchProvider
        });
    },
    unbind: (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
        let context = vnode.context as JSONObject;
        let touchSwipe = context.customObject.touchSwipe as TouchSwipe;
        touchSwipe.dispose();
        delete context.customObject.touchSwipe;
    }
});

new Vue({
    router: router,
    store: stores,
    render: h => h(App)
}).$mount('#root');