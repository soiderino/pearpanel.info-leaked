import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#000000',      // Bright Blue
                secondary: '#272727',    // Gold
                accent: '#00ced1',       // Dark Turquoise
                error: '#dc143c',        // Crimson Red
                background: '#f0f0f0',   // Light Gray
            },
            dark: {
                primary: '#517c50',      // Dark Cyan
                secondary: '#ffdf00',    // Yellow
                accent: '#20b2aa',       // Light Sea Green
                error: '#8CA110',        // Fire Brick Red
                background: '#d91111',   // Dark Gray
            },
        },
    },
});
