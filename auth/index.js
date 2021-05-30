const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')
//Se trae el secret desde el objeto de configuracion en el config.js
const secret = config.jwt.secret

function sign(data) {
    const token =  jwt.sign({data}, secret)
    return token
    
}
function verify(token) {
    return jwt.verify(token, secret)
}
//Este es el objeto con funciones que se llama en el middleware de secure, lo que hará será obtener el token del
//Usuario que está realizando la peticion, decodificarlo y verificar si efectivamente tiene permisos para hacer los cambios
const check = {
    own : function(req, owner) {
        const decoded = decodeHeader(req)

        //Comprobamos si el token es propio o no
        if (decoded.data.id !== owner) {
            throw error('No tienes permisos para hacer esto', 401)
        }
    },
    logged: function(req, owner){
        const decoded = decodeHeader(req)
    }

}
//Verificamos que el token coincida con el secret

function getToken(auth) {
    //Si no viene token en authorization mandamos error
    if (!auth) {
        throw new Error('No viene token')
    }
    //Verificamos que el formato del token sea correcto
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido')
    }
    //quitamos la palabra bearer que siempre viene en los tokens de la cabecera
    let token = auth.replace('Bearer ', '')
    return token
}
//
function decodeHeader(req) {
    //Obtenemos la cabecera de la autenticacion
    const authorization = req.headers.authorization || ''
    //Funcion para sacar el token de la cabecera
    const token = getToken(authorization)
    //Verifica si el token es valido
    const decoded = verify(token)

    req.user = decoded

    return decoded
}

module.exports = {
    sign,
    check,
}