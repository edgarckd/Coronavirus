module.exports = function (injecStore) {
    let store = injecStore

    if (!store) {
        store = require('../../../store/mysql')
    }
    const TABLE = 'Estados'

    function list() {
         return store.list(TABLE)
        
    }
    async function upsert(body) {
        
        const regPaciente = {
            idCaso: body.idCaso,
            numIdentificacion: body.numIdentificacion,
            FechaExamen: body.FechaExamen,
            resExamen: body.resExamen,
            Estado: body.Estado,
            primerNombre: body.primerNombre,
            primerApellido: body.primerApellido,
        }
        let res = await store.query(TABLE,{numIdentificacion: body.numIdentificacion})
        if (!body.primerNombre) {//cuando voy agregar estado de un paciente, no se le envia nombre. por ende busca al que ya aparece registrado y y toma los datos faltantes para hacer el registro del estado
                regPaciente.primerNombre = res.primerNombre
                regPaciente.primerApellido = res.primerApellido
            let muerto = await store.ultimo(TABLE, {Estado: "Muerte"} ,{numIdentificacion: body.numIdentificacion})
            console.log(muerto);
                if (muerto !== null) { //si el paciente está muerto ya no lo puedo registrar
                    throw new Error('No se puede hacer el registro dado que el paciente falleció')
                }
            }
                return store.upsert(TABLE, regPaciente)
    }
    async function remove(id){

        return store.remove(TABLE, id)
    }
    function get(opcion, data) {
        const lista= store.get(TABLE, opcion, data)
        return lista
    }
    return {
        list,
        upsert,
        get,
        remove
    }
}