import Vue from 'vue'
import App from '@/pages/App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from '@/components/element-ui'
import '@/utils/register'
import '@/echarts'
import '@/styles/reset.scss'
import '@/styles/common.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
