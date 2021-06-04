const bcrypt = require('bcrypt')
const auth = require('../../auth/index')

const TABLA = 'autentication'
module.exports = function (injecStore) {
    let store = injecStore

    if (!store) {
        store = require('../../../store/dummy')
    }

    async function login(username, password) {
        const data = await store.query(TABLA, {
            User: username,
            
        })
        return bcrypt.compare(password, data.Password)
            .then(sonIguales => {
                if(sonIguales === true) {
                    if (data.idRoles === 1) {
                        let datos = {
                            rol: 'Administrador',
                            id: data.numIdentificacion,
                            sign: auth.sign()
                        }
                        return datos
                    }else if (data.idRoles === 2){
                        let datos = {
                            rol: 'Medico',
                            id: data.numIdentificacion,
                            sign: auth.sign()
                        }
                        return datos
                    }else if (data.idRoles === 3){
                        let datos = {
                            rol: 'Practicante',
                            id: data.numIdentificacion,
                            sign: auth.sign()
                        }
                        return datos
                    }
                } else {
                    throw new Error('Informacion inválida')
                }
            })


    }
    async function upsert(data) {
        const authData = {
            idIdentificacion: data.idIdentificacion,
            numIdentificacion: data.nmIdentificacion,
            idRoles : data.idRoles
        }
        if (data.User) {
            authData.User = data.User
        }
        if (data.Password) {
            authData.Password = await bcrypt.hash(data.Password, 10)
        }
        return store.upsert(TABLA, authData)
    }
    return {
        upsert,
        login,
    }
}