import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/router';
import "element-plus/dist/index.css";

createApp(App)
  .use(ElementPlus)
  .use((createPinia()))
  .use(router)
  .mount('#app')
