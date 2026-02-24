import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import './style.css'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
}
  

createApp(App)
  .use(vuetify)
  .use(Toast, toastOptions)
  .mount('#app')