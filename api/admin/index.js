const store = require('../../database/mysql')
const ctrl = require('./controller')

module.exports = ctrl(store)