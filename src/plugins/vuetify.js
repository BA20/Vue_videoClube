import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FF6732',
        secondary: '#006DB3',
        accent: '#FFCA00',
        error: '#DC3545',
        info: '#6C757D',
        success: '#4CAF50',
        warning: '#2A2F3D',
        blueAccent: '#00bcd4'
      },
      dark: {
        primary: '#FF6732',
        secondary: '#006DB3',
        accent: '#FFCA00',
        error: '#DC3545',
        info: '#6C757D',
        success: '#4CAF50',
        warning: '#2A2F3D',
        blueAccent: '#00bcd4'
      }
    }
  },
  icons: {
    iconfont: 'fa'
  }
})
