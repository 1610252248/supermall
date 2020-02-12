import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "@/components/common/toast";
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
FastClick.attach(document.body);
Vue.use(toast)
Vue.use(VueLazyload, {
  loading: require('@/assets/img/common/placeholder.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
