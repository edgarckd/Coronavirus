//me facilita la consulta de la base de datos

const store = require('../../database/mysql')
const ctrl = require('./controller')

module.exports = ctrl(store)