'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//测试环境接口线上
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SITE_ROOT: '"https://www.qiang100.com/"',
    API_ROOT: '"https://browser-plugin.qiang100.com/"'
})

