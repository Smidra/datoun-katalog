import { createApp } from 'vue';
import App from './App.vue';
import CarbonComponentsVue from '@carbon/vue';
import 'carbon-components/css/carbon-components.min.css';

const app = createApp(App);
app.use(CarbonComponentsVue);

app.mount('#app');