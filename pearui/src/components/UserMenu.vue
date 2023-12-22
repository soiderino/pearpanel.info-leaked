<template>
  <v-menu left bottom offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="handleMenuClick(item)"
      >
        <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    menuItems: {
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
