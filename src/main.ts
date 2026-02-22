import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import './style.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App)
  .use(vuetify)
  .use(Toast)
  .mount('#app')