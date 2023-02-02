import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
createApp(App).use(Toast).mount('#app')
