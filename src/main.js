import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import IconBase from './components/ui/IconBase';
import Spinner from './components/ui/Spinner';
import Toast from './components/ui/Toast';
import List from './components/ui/List';

const app = createApp(App);

app.component('IconBase', IconBase);
app.component('Spinner', Spinner);
app.component('Toast', Toast);
app.component('List', List);

app.use(store).use(router).mount('#app');
