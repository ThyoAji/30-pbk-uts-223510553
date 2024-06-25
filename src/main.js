import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.sass';
import { createPinia } from 'pinia';
import './style.css'

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(Quasar);

app.mount('#app');
