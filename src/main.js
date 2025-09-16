import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // If using icons

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
