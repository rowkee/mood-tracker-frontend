import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import Vue3Cookies from "vue3-cookies";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import  globalStyle from '../css/globalStyle.css'
import moment from 'moment';


const app = createApp(App)

app.use(router)
app.config.globalProperties.$moment = moment
app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID})

app.use(Vue3Cookies, {
    expireTimes: "1d", // 24 hours
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
  });

app.use(globalStyle)

app.mount('#app')
