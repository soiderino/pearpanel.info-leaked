import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueI18n from 'vue-i18n';
import en from '/i18n/en';
import ru from '/i18n/ru';
import '/global.css'
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router'; // импорт VueRouter
import router from '/router/index.js'; // импорт вашего экземпляра VueRouter
import store from '/store';
import "/node_modules/flag-icons/css/flag-icons.min.css";
Vue.use(VueCookies);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter); // использование VueRouter

const i18n = new VueI18n({
  locale: 'en', // установите здесь язык по умолчанию
  fallbackLocale: 'en',
  messages: { en, ru }
});

const isAuthenticatedCookie = Vue.$cookies.get('isAuthenticated');
if (isAuthenticatedCookie === 'true') {
  // Если пользователь аутентифицирован, установите состояние аутентификации в Vuex store
  store.commit('authenticate');
}
Vue.prototype.$store = store;
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  i18n,
  router, // добавление router в экземпляр Vue
  render: h => h(App),
}).$mount('#app');
