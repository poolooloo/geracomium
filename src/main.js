import Vue from 'vue'
import App from '@/pages/App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from '@/components/element-ui'
import Widgets from '@/widgets'
import '@/utils/register'
import '@/echarts'
import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/iconfont/iconfont'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Widgets)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
