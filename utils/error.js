//esta funcion hace que me muestr los errores en pantalla cada vez que se produce uno
function err(message, code) {
    let e = new Error(message)

    if (code) {
        e.statusCode= code
    }
    
    return e
}

module.exports = err