import EchartWrapper  from '@/widgets/echarts/echart-wrapper'
import EchartView from '@/widgets/echarts/echart-view'

const components = [
  EchartWrapper,
  EchartView
]

const install = Vue => {
  if (install.installed) {
    return
  }
  components.map(element => Vue.component(element.name, element))
}

typeof window !== 'undefined' && window.Vue && install(window.Vue)

export default {
  install
}