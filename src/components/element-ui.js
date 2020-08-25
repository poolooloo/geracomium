import {
  Select,
  Option,
  Dialog,
  Button
} from 'element-ui'

const components = [
  Select,
  Option,
  Dialog,
  Button
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