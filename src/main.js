import Vue from "vue";
import VueRx from 'vue-rx'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css'


Vue.use(BootstrapVue)
Vue.use(VueSidebarMenu)

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

import { Observable } from 'rxjs'

Vue.config.productionTip = false;
Vue.use(VueRx, {
  Observable
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
