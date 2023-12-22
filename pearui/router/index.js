import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '/store';

import LoginPage from '@/views/HelloWorld.vue';
import MainPage from '@/views/MainPage.vue';
import Phishing from "@/views/PhishingPage.vue";
import Settings from "@/views/SettingStealer.vue"; // Это дочерний компонент для /loader/settings
import Loading from  "@/views/StealerLoading.vue";
import Stealer from  "@/views/StealerStatistics.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: LoginPage },
    { path: '/main', component: MainPage, meta: { requiresAuth: true }},
    { path: '/phishing', component: Phishing, meta: { requiresAuth: true }},
    { path: '/loader/settings', component: Settings, meta: { requiresAuth: true }},
    { path: '/loader/stealer', component: Loading, meta: { requiresAuth: true }},
    { path: '/loader/statistics', component: Stealer, meta: { requiresAuth: true }},
    /*{
        path: '/loader/settings',
      //  component: Loader,
        meta: { requiresAuth: true },
        children: [ // Дочерние маршруты для /loader
            {
                path: 'settings',
                component: Settings,
            },
            // Добавьте здесь дополнительные дочерние маршруты, если необходимо
        ],
    }*/
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

// Навигационный охранник для проверки авторизации
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !store.state.isAuthenticated) {
        next('/');
    } else if (!store.state.isAuthenticated && to.path !== '/') {
        next('/');
    } else {
        next();
    }
});

export default router;
