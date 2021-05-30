const auth = require('../../../auth')

//Se exporta un middleware que es una funcion que tomara un caso y decidirá si lo ejecuta o no, en caso de no ejecutarlo dará un error
//El middleware recibirá el id del usuario que se modificará y llamará a otra funcion ya que esta es solo para comprobar si puede o no
module.exports = function checkAuth(action){
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                const owner = req.body.id
                auth.check.own(req, owner)
                next()
                break;
            case 'follow':
                auth.check.logged(req)
                next()
                break;
        
            default:
                next()
                break;
        }
    }
    return middleware
}