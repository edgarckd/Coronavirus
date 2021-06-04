module.exports = function (injecStore) {
    let store = injecStore

    if (!store) {
        store = require('../../../store/mysql')
    }
    const TABLE = 'Casos'

    function list() {
        return store.list(TABLE)
       
   }

    async function getdir(id) {
        let dir = await store.query(TABLE, {numIdentificacion: id})
         return store.dir(TABLE, {direccionRes: dir.direccionRes}, {numIdentificacion: id})
        
    }
    return{
        getdir,
        list
    }
}