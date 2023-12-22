<template>
  <v-app-bar app dark>
    <v-toolbar-title class="pear-title">
      <v-icon class="pear-icon" v-ripple="false" @click="$emit('toggle-drawer')">mdi-fruit-pear</v-icon>
      <div class="panel-text no-select">PEAR<span class="thin-text">PANEL</span></div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$emit('switch-theme')" title="$t('changeTheme')">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <UserMenu :menu-items="userMenuItems" @menu-click="handleMenuClick" />
  </v-app-bar>
</template>

<script>
import UserMenu from './UserMenu.vue'

export default {
  components: {
    UserMenu
  },
  props: {
    userMenuItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleMenuClick(item) {
      this.$emit('menu-click', item);
    }
  }
}
</script>
<style>
.panel-text {
  display: inline-flex;
  align-items: center; /* Aligns the content vertically */
  font-size: 18px;
  color: #fff; /* Change color as needed */
  letter-spacing: 7px; /* Adjust letter spacing as needed */
}

.thin-text {
  font-weight: 300; /* Adjust font-weight for thinner text */
}

.pear-icon {
  font-size: 24px; /* Adjust size as needed */
  margin-right: 8px; /* Adjust margin as needed */
  cursor: pointer;
}

/* Add the following CSS to align the pear icon with the text */
.pear-title {
  display: flex;
  align-items: center;
}


.no-select {
  user-select: none;
}

</style>