const ctrl = require('./controller')
const store = require('../../database/mysql')

module.exports = ctrl(store)