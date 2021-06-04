
const auth = require('../auth') // importa el modulo de auth para que los usuarios queden regitrado en la tabla de autenticacion

//exporta cada una de las funciones que son consulta en la base de datos
module.exports = function (injecStore) { //me recibe el parametro Store, que está en archivo index del modulo admin
    let store = injecStore

    //Store contiene todas las sentencias de la base de datos mysql
    if (!store) {
        store = require('../../../store/mysql') //si no llega nada toma el archivo de prueba del sql (solo se usó durante el desarrollo de la web)
    }
    const TABLE = 'Usuarios'

    function list() {
         return store.list(TABLE) //lista todos los elementos que estan almacenados en la tabla de usuario
        
    }
    function get(id) { //obtiene el usurio por el ID cedula
        const lista= store.get(TABLE, id)
        return lista
    }
    //la funcion asyncrona espera un resultado para continuar con su funcionamiento
    async function upsert(body) { //añade el usuario a la tabla usuarios
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
        return store.upsert(TABLE, user) //en el archivo sql guarda lo que está en Table. guada el objeto user
    }
    async function remove(id){
        const data = await store.query('autentication', {numIdentificacion : id}) //se borra tambien el usuario de la tabla autenticacion

        if (data){
            store.remove('autentication', id)
        }

        return store.remove(TABLE, id) //borra el usuario que contenga el id
    }

    //me permite el llamado de las funciones en el archivo network
    return {
        list,
        get,
        upsert,
        remove
    }
}