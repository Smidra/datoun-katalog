import { createApp } from 'vue'
import App from './App.vue'
/* import InstantSearch from 'vue-instantsearch/vue3/es';*/
import InstantSearch from 'vue-instantsearch/vue3/es';
import naive from 'naive-ui'
import './style.css'


createApp(App)
    .use(InstantSearch)
    .use(naive)
    .mount('#app')