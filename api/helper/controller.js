const handle = require('../handleRegister')

module.exports = function (injecStore) {
    let store = injecStore

    if (!store) {
        store = require('../../../store/mysql')
    }
    const TABLE = 'Casos'

    function list() {
         return store.list(TABLE)
        
    }
    function get(opcion, data) {
        const lista= store.get(TABLE, opcion, data)
        return lista
    }
    async function upsert(body) {
        const paciente = {
            Nombre1: body.Nombre1,
            Nombre2: body.Nombre2,
            Apellido1: body.Apellido1,
            Apellido2: body.Apellido2,
            numIdentificacion: body.numIdentificacion,
            FechaNacimiento: body.date,
            idCaso: body.idCaso,
            direccionRes: body.direccionRes,
            direccionTrab: body.direccionTrab,
            resExamen: body.resExamen,
            fechaExamen: body.fechaExamen,
            Estado: body.Estado
        }
        let res = store.query('Estados', {numIdentificacion: paciente.numIdentificacion})
        if (res !== null) {
            await handle.upsert({
                FechaExamen: paciente.fechaExamen,
                resExamen: paciente.resExamen,
                idCaso: paciente.idCaso,
                numIdentificacion: paciente.numIdentificacion,
                Estado: paciente.Estado,
                primerNombre: paciente.Nombre1,
                primerApellido: paciente.Apellido1,
            })
        }
        if (body.idSexo === 'value1') {
            paciente.idSexo = 1
        }else if (body.idSexo === 'value2'){
            paciente.idSexo = 2
        }else if (body.idSexo === 'value3'){
            paciente.idSexo = 3
        }

        if (body.idIdentificacion === "value1") {
            paciente.idIdentificacion = 1
        }else if (body.idIdentificacion === 'value2'){
            paciente.idIdentificacion = 2
        }else if (body.idIdentificacion === "value3"){
            paciente.idIdentificacion = 3
        }else if (body.idIdentificacion === "value4"){
            paciente.idIdentificacion = 4
        }
        return store.upsert(TABLE, paciente)
    }
    async function remove(id){
        const data = await store.query('Estados', {numIdentificacion : id})

        if (data){
            store.remove('Estados', id)
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