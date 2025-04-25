// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'  // 引入 Pinia
import App from './App.vue'
import router from './router'
import './index.css'

// 創建 Pinia 實例
const app = createApp(App)
const pinia = createPinia()

// 註冊 Pinia 並掛載 app
app.use(pinia)
app.use(router)

app.mount('#app')
