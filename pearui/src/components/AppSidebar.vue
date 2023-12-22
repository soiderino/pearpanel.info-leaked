<template>
  <v-navigation-drawer :value="drawer" @input="$emit('update:drawer', $event)" app overlay temporary>
    <v-list>
      <v-list-item-group>
        <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="handleMenuClick(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="mdi-download" v-model="loaderExpanded">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{$t('loader')}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
              v-for="(item, index) in loaderMenuItems"
              :key="index"
              @click="handleMenuClick(item)"
              class="pl-5"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t(item.title)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true
    },
    loaderMenuItems: {
      type: Array,
      required: true
    },
    drawer: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      localDrawer: false, // присваиваем начальное значение
      loaderExpanded: false
    };
  },
  watch: {
    drawer(newVal) {
      this.localDrawer = newVal; // обновляем localDrawer, когда свойство drawer меняется
    },
  },
  methods: {
    handleMenuClick(item) {
      this.$emit('menu-click', item);
      this.localDrawer = false;
      this.loaderExpanded = false;
    }
  },
  mounted() {
    this.localDrawer = this.drawer; // устанавливаем начальное значение localDrawer, когда компонент смонтирован
  }
}
</script>
