'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


//开发测试环境接口
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SITE_ROOT: '"https://dev-www.qiang100.com/"',
  API_ROOT: '"https://dev-browser-plugin.qiang100.com/"'
})
