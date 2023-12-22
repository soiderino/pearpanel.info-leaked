<template>
  <v-app class="overflow-hidden">
    <v-main class="align-center justify-center">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="4" md="3">
            <v-card class="elevation-2 pa-5 rounded">
              <v-card-text>
                <div class="text-center mb-5 no-select"> <!-- увеличиваем отступ снизу от груши -->
                  <span style="font-size: 4em;">🍐</span>
                </div>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                      id="password"
                      :label="$t('password')"
                      type="password"
                      v-model="password"
                      :rules="passwordRules"
                      underlined
                      class="mb-3"
                      hide-details="auto"
                  />
                  <v-btn
                      color="primary"
                      :disabled="!valid"
                      block
                      @click="submit"
                  >
                    {{$t('login')}}
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="transparent" app>
      <v-spacer/>
      <v-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="darkTheme">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <span>{{$t('changeTheme')}}</span>
      </v-tooltip>
      <v-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="changeLocale">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>{{$t('changeLanguage')}}</span>
      </v-tooltip>
    </v-footer>
  </v-app>
</template>

<script>
import enMessages from '/i18n/en';
import ruMessages from '/i18n/ru';

export default {
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [],
    currentLocale: 'en'
  }),
  created() {
    this.$i18n.locale = this.currentLocale;
    this.setRules();
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Проверяем пароль
        if (this.password === "fghjcvbn") {
          // Если пароль верный, обновляем состояние аутентификации в Vuex store
          this.$cookies.set('isAuthenticated', 'true', 60 * 60);
          this.$store.commit('authenticate');

          // Затем перенаправляем пользователя на главную страницу
          this.$router.push('/main');
        } else {
          // Можно добавить здесь уведомление о неверном пароле
          alert(this.$t('wrongPassword'));
        }
      }
    },
  darkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    changeLocale() {
      this.currentLocale = this.currentLocale === 'en' ? 'ru' : 'en';
      this.$i18n.locale = this.currentLocale;
      this.setRules();
    },
    setRules() {
      this.$nextTick(() => {
        this.passwordRules = [
          v => !!v || this.$t('passwordRequired'),
          v => v.length >= 8 || this.$t('passwordLength')
        ];
      });
    }
  },
  i18n: {
    messages: {
      en: enMessages,
      ru: ruMessages
    }
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 15px;
}

.no-select {
  user-select: none;
}
html, body {
  overflow: hidden !important;
  height: 100%;
}
</style>
