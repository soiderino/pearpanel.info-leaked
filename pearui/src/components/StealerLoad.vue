<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input label="Загрузить файл" @change="handleFile"></v-file-input>
        <v-btn :disabled="!selectedFile" @click="uploadFile">Загрузить</v-btn>
        <p v-if="uploadStatus">{{ uploadStatus }}</p>
        <a v-if="uploadedFileUrl" :href="uploadedFileUrl" target="_blank">{{ uploadedFileUrl }}</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      uploadStatus: '',
      uploadedFileUrl: '',
    };
  },
  methods: {
    handleFile(file) {
      this.selectedFile = file;
    },
    uploadFile() {
      if (!this.selectedFile) {
        this.uploadStatus = 'Файл не выбран';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const url = 'https://add.pearpanel.info/load/fileupload';  // обновленный URL

      this.uploadStatus = 'Загрузка...';

      fetch(url, {
        method: 'POST',
        body: formData,
      })
          .then(response => response.json())
          .then(data => {
            this.uploadedFileUrl = data.url;
            this.uploadStatus = 'Файл успешно загружен!';
          })
          .catch(error => {
            console.error('Ошибка загрузки файла:', error);
            this.uploadStatus = 'Ошибка загрузки файла';
          });
    },
  },
};
</script>
