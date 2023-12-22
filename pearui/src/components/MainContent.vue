<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col
            v-for="(item, index) in tiles"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <v-card :color="getColor()" dark class="d-flex pa-6">
            <v-row no-gutters>
              <v-col cols="4" class="d-flex justify-center align-center">
                <v-icon x-large>{{ item.icon }}</v-icon>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6">
                    <div class="overline mb-2">TODAY</div>
                    <div class="display-1 mb-4">{{ item.today }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="overline mb-2">ALL</div>
                    <div class="display-1">{{ item.all }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    tiles: [
      { icon: 'mdi-android', today: 4, all: 100 },
      { icon: 'mdi-wallet', today: 5, all: 150 },
      { icon: 'mdi-download', today: 6, all: 120 },
      { icon: 'mdi-cog', today: 7, all: 110 },
    ],
  }),
  methods: {
    getColor() {
      return this.$vuetify.theme.dark ? 'primary' : 'secondary';
    },
  },
};
</script>

<style scoped>
.v-main {
  margin-top: -16px; /* Adjust this value as needed */
}
