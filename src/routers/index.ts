export default [{
    path: '/',
    component: () => import('../pages/App.vue')
}, {
    path: '/mywallet',
    component: () => import('../pages/MyWallet.vue')
}, {
    path: '/myconcern',
    component: () => import('../pages/MyConcern.vue')
}]