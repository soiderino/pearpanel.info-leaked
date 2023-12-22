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
    <StealerTable :phishingData="phishingData" class="ma-3"/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import StealerTable from '../components/StealerTable.vue'
import axios from 'axios';

export default {
  components: {
    AppHeader,
    AppSidebar,
    StealerTable,
  },
  data: () => ({
    drawer: false,
    phishingData: [],
    originalPhishingData: [],
    menuItems: [
      { title: 'home', icon: 'mdi-home', route: '/main' },
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
    filterToday() {
      const today = new Date();

      this.phishingData = this.originalPhishingData.filter(item => {
        const [day, month, year] = item.date.split(".");
        const itemDate = new Date(year, month - 1, day);
        return itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() === today.getMonth() && itemDate.getDate() === today.getDate();
      });
    }
    ,
  },
  async created() {
    try {
      const response = await axios.get('https://add.pearpanel.info/give/loader');
      this.originalPhishingData = this.phishingData = response.data.map(item => ({
        id: item._id,
        date: item.time,
        time: item.nowtime,
        country: item.country,
        ipaddress: item.address,
        username: item.username,
        windows: item.windows
      }));
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
