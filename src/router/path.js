const NODE_ENV = process.env.NODE_ENV || 'production'
const _import_ = require('@/router/_import_' + NODE_ENV + '.js')
const index = _import_('index')

export default {
  index,
}