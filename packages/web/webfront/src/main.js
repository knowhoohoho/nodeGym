import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookies'





import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




const app = createApp(App)


app.use(VueCookie)
.use(router)
.mount('#app')


