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
    <PhishingTable :phishingData="phishingData" class="ma-3"/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import PhishingTable from '../components/PhishingTable.vue'

export default {
  components: {
    AppHeader,
    AppSidebar,
    PhishingTable,
  },
  data: () => ({
    drawer: false,
    phishingData: [
      { id: 1, date: '2023-07-24', account: { login: 'user1', password: 'pass1' }, service: 'Service A' },
      { id: 2, date: '2023-07-24', account: { login: 'user2', password: 'pass2' }, service: 'Service B' },
      { id: 3, date: '2023-07-24', account: { login: 'user3', password: 'pass3' }, service: 'Service C' },
      { id: 4, date: '2023-07-24', account: { login: 'user1', password: 'pass4' }, service: 'Service A' },
      { id: 5, date: '2023-07-24', account: { login: 'user2', password: 'pass5' }, service: 'Service B' },
      { id: 6, date: '2023-07-24', account: { login: 'user3', password: 'pass6' }, service: 'Service C' },
      { id: 7, date: '2023-07-24', account: { login: 'user1', password: 'pass7' }, service: 'Service A' },
      { id: 8, date: '2023-07-26', account: { login: 'user2', password: 'pass8' }, service: 'Service B' },
      { id: 9, date: '2023-07-26', account: { login: 'user3', password: 'pass9' }, service: 'Service C' },
      { id: 10, date: '2023-07-26', account: { login: 'user1', password: 'pass10' }, service: 'Service A' },
      { id: 11, date: '2023-07-26', account: { login: 'user2', password: 'pass11' }, service: 'Service B' },
      { id: 12, date: '2023-07-26', account: { login: 'user3', password: 'pass12' }, service: 'Service C' },
      { id: 13, date: '2023-07-26', account: { login: 'user1', password: 'pass13' }, service: 'Service A' },
      { id: 14, date: '2023-07-26', account: { login: 'user2', password: 'pass14' }, service: 'Service B' },
      { id: 15, date: '2023-07-26', account: { login: 'user3', password: 'pass15' }, service: 'Service C' },
      // и так далее...
    ],

    menuItems: [
      { title: 'home', icon: 'mdi-home', route: '/main' },
     // { title: 'phishing', icon: 'mdi-fish', route: '/phishing' },
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
    ],
  }),
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

