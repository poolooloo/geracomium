import env from './api-env'

// api url 前缀目录，个别项目存在。
const prefix = {
  mock: 'api/Screen/',
  dev: 'api/Screen/',
  prod: 'api/Screen/'
}

export default prefix[env]