import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
//根据事件总线传递函数
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
