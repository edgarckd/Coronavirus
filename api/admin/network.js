const express = require('express')

//llama el archivo index para poder usar las fiunciones de la base de datos
const Controller = require('./index')
//utiliza la funcion router de express
const router = express.Router()

//esta ruta permite obtener los usuarios
router.get('/get', (req, res, next) => {
    Controller.list()
        .then((lista) => { //cuadno se resuelve la promesa en el archivo controler el resultado que devuelve se envia a la plantilla admin.pug
            res.render('admin', {//se envia el archivo admin.pug
                lista,
                usuario: req.cookies.usuario
            })
        })
        .catch(next)
})
//recibe los datos del formulario para el registro de los usuarios
router.post('/reg', (req, res, next) => {
    Controller.upsert(req.body)
        .then((result) => {
            res.render('regSuccess')
        }).catch(next)
})
//borra un usuario por su id
router.get('/delete/:id', (req, res, next) => {
    let id= req.params.id
    console.log(id);
    Controller.remove(req.params.id)
    .then(() =>{
        res.redirect('/admin')
    }).catch(next)
})
//exporta todas esas rutas para el archivo index
module.exports = router