import env from '@/api/api-env'

// dev与prod环境中的host，一般默认为服务器根目录下，个别情况会在mock环境时，host会使用第三方ip
const host = {
  mock: 'http://mp-ut.yanglaola.cn',
  dev: 'http://mp-ut.yanglaola.cn',
  prod: 'http://mp-ut.yanglaola.cn'
}

export default host[env]