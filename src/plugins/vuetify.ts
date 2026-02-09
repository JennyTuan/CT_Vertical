import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'ctLight',
    themes: {
      ctLight: {
        dark: false,
        colors: {
          background: '#F2F4F7',
          surface: '#FFFFFF',
          primary: '#1E4D94',
          secondary: '#96C496',
          error: '#EF6C00',
          info: '#1E88E5',
        },
      },
    },
  },
});

export default vuetify;
