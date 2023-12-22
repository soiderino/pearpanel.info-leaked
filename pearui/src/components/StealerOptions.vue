<template>
  <v-container fluid>
    <v-btn class="mb-3" @click="addTile">Добавить</v-btn>
    <v-row>
      <v-col v-for="(tile, index) in tiles" :key="tile.id" cols="12" sm="6" md="4">
        <v-card class="pa-3">
          <v-card-title>
            Сервис {{ index + 1 }}
          </v-card-title>
          <v-card-text>
            <v-text-field class="mb-3" label="Введите ссылку" v-model="tile.link"></v-text-field>
            <v-select
                :items="countryList"
                item-text="name"
                item-value="code"
                label="Выберите страну"
                v-model="tile.country"
                multiple
                hint="Можно выбрать несколько стран"
                persistent-hint>
              <template v-slot:selection="{ item, index }">
                <v-chip
                    v-if="index === 0"
                    :key="`${item.code}-chip`"
                    label
                    small
                >
                  {{ tile.country.join(', ') }}
                </v-chip>
              </template>
            </v-select>


          </v-card-text>
          <v-card-actions>
            <v-btn v-if="tile.isNew" @click="saveTile(tile)">Сохранить</v-btn>
            <v-btn @click="editTile(tile)">Редактировать</v-btn>
            <v-btn @click="deleteTile(tile.id)">Удалить</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import countries from 'i18n-iso-countries';
import 'i18n-iso-countries/langs/en.json';
import axios from 'axios';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export default {
  data() {
    return {
      tiles: [],
      countryList: Object.entries(countries.getNames('en')).sort((a, b) => a[1].localeCompare(b[1])).map(([code, name]) => ({ code, name })),
    };
  },
  created() {
    this.loadTiles();
  },
  methods: {
    addTile() {
      this.tiles.push({ id: this.generateId(), link: '', country: [], isNew: true });
    },


    async loadTiles() {
      try {
        const response = await axios.get('https://add.pearpanel.info/give/settings');

        // Преобразование ответа сервера к формату, используемому в Vue компоненте
        this.tiles = response.data.map(tile => ({
          id: tile._id,  // Преобразование _id в id
          link: tile.service,  // Преобразование service в link
          country: tile.country.split(', ').map(item => item.trim()),  // Преобразование строки стран в массив стран
          exe: tile.exe,  // Это дополнительное свойство, если вы хотите его сохранить
          time: tile.time,
          isNew: false// Это также дополнительное свойство, если вы хотите его сохранить
        }));
      } catch (error) {
        console.error("Error loading tiles:", error.message);
      }
    },

    async saveTile(tile) {
      const url = new URL(tile.link);
      const pathParts = url.pathname.split('/');
      const exe = pathParts[pathParts.length - 1];

      const tileData = {
        time: new Date().toISOString(),
        service: tile.link,
        exe: exe,
        country: tile.country.join(', ')
      };

      try {
        const response = await axios.post('https://add.pearpanel.info/add/settings', tileData);
        if (response.data.success) {
          console.log("Tile successfully saved!");
          tile.isNew = false;  // Установка флага isNew в false после успешного сохранения
        } else {
          console.error("Error saving the tile:", response.data.message);
        }
      } catch (error) {
        console.error("Error saving the tile:", error.message);
      }
    }
    ,

    async editTile(tile) {
      const tileData = {
        service: tile.link,
        country: tile.country.join(', ')
      };

      try {
        await axios.patch(`https://add.pearpanel.info/edit/settings/${tile.id}`, tileData);
        console.log("Tile successfully updated!");
      } catch (error) {
        console.error("Error updating the tile:", error.message);
      }
    },

    async deleteTile(tileId) {
      try {
        await axios.delete(`https://add.pearpanel.info/remove/settings/${tileId}`);
        this.tiles = this.tiles.filter(tile => tile.id !== tileId);
        console.log("Tile successfully deleted!");
      } catch (error) {
        console.error("Error deleting the tile:", error.message);
      }
    },

    generateId() {
      return Math.random().toString(36).substr(2, 9);
    },
  }
};
</script>




