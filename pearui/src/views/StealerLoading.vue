<template>
  <div>
    <AppHeader
        :user-menu-items="userMenuItems"
        @switch-theme="switchTheme"
        @toggle-drawer="drawer = !drawer"
        @menu-click="handleMenuClick"
    />
    <AppSidebar
        :menu-items="menuItems"
        :loader-menu-items="loaderMenuItems"
        :drawer="drawer"
        @update:drawer="drawer = $event"
        @menu-click="handleMenuClick"
    />
    <FileUploadComponent />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import FileUploadComponent from '../components/StealerLoad.vue'

export default {
  components: {
    AppHeader,
    AppSidebar,
    FileUploadComponent,
  },
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'home', icon: 'mdi-home', route: '/main' },
      //  { title: 'phishing', icon: 'mdi-fish', route: '/phishing' },
       // { title: 'apk', icon: 'mdi-android', route: '/apk' },
      ],
      userMenuItems: [
        { title: 'profile', icon: 'mdi-account', route: '/profile' },
        { title: 'mySettings', icon: 'mdi-cog', route: '/settings' },
        { title: 'logout', icon: 'mdi-logout', route: '/logout' },
      ],
      loaderMenuItems: [
        { title: 'settings', icon: 'mdi-cog', route: '/loader/settings' },
        { title: 'stealer', icon: 'mdi-file-download-outline', route: '/loader/stealer' },
        { title: 'stats', icon: 'mdi-file-chart', route: '/loader/statistics' },
      ], // Добавьте здесь ваш массив или объект
      // другие свойства, если они нужны
    };
  },
  methods: {
    handleMenuClick(item) {
      if (this.$router.currentRoute.path !== item.route) {
        // eslint-disable-next-line
        this.$router.push(item.route).catch(err => {});
      }
      this.drawer = false;
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
