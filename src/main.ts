import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster';


const app = createApp(App)

app.use(router)

app.use(Toaster,   {
    position: 'top-right',
    duration: 5000,
    className: 'toast',
    singleton: true,
    iconPack: 'fontawesome',
})
app.mount('#app')
