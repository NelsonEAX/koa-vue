import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';

import App from './App.vue';

Vue.use(Vuetify);
sync(store, router);

new Vue({
  render: (h) => h(App),
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({}),
});
