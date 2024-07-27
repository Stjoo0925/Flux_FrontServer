import './assets/css/font.css'
import './assets/css/reset.css'
import './assets/css/scrollbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css';

import { createApp } from 'vue'
import pinia from './pinia' // Pinia 플러그인을 가져옵니다.

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia) // Pinia 사용 설정
app.use(router)

app.mount('#app')
