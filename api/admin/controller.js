const auth = require('../auth')


module.exports = function (injecStore) {
    let store = injecStore

    if (!store) {
        store = require('../../../store/mysql')
    }
    const TABLE = 'Usuarios'

    function list() {
         return store.list(TABLE)
        
    }
    function get(id) {
        const lista= store.get(TABLE, id)
        return lista
    }
    async function upsert(body) {
        const user = {
            Nombre1: body.Nombre1,
            Nombre2: body.Nombre2,
            Apellido1: body.Apellido1,
            Apellido2: body.Apellido2,
            numIdentificacion: body.numIdentificacion,
        }

        if (body.idIdentificacion === "value1") {
            user.idIdentificacion = 1
        }else if (body.idIdentificacion === 'value2'){
            user.idIdentificacion = 2
        }else if (body.idIdentificacion === "value3"){
            user.idIdentificacion = 3
        }else if (body.idIdentificacion === "value4"){
            user.idIdentificacion = 4
        }
        if (body.idSexo === "value1") {
            user.idSexo = 1
        }else if (body.idSexo === "value2") {
            user.idSexo = 2
        }else if (body.idSexo === "value3") {
            user.idSexo = 3
        }
        if (body.idRoles === "value1"){
            user.idRoles = 1
        }else if (body.idRoles === "value2"){
            user.idRoles = 2
        }else if (body.idRoles === "value3"){
            user.idRoles = 3
        }

        if(body.Password || body.User){
            await auth.upsert({
                idIdentificacion : user.idIdentificacion,
                User: body.User,
                Password: body.Password,
                nmIdentificacion : user.numIdentificacion,
                idRoles: user.idRoles
            })
        }
        return store.upsert(TABLE, user)
    }
    async function remove(id){
        const data = await store.query('autentication', {numIdentificacion : id})

        if (data){
            store.remove('autentication', id)
        }

        return store.remove(TABLE, id)
    }
    return {
        list,
        get,
        upsert,
        remove
    }
}