import { createApp } from 'vue';
// import store from './store';
import { pinia } from './pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue';
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);

app.use(pinia);
app.use(ElementPlus);
app.use(Vant);

app.mount('#app');