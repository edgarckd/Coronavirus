const express = require('express')

const Controller = require('./index')

const router = express.Router()

router.get('/get', (req, res, next) => {
    Controller.list()
        .then((lista) => {
            res.render('admin', {
                lista,
                usuario: req.cookies.usuario
            })
        })
        .catch(next)
})
router.post('/reg', (req, res, next) => {
    Controller.upsert(req.body)
        .then((result) => {
            res.send(result)
        }).catch(next)
})
router.get('/delete/:id', (req, res, next) => {
    let id= req.params.id
    console.log(id);
    Controller.remove(req.params.id)
    .then(() =>{
        res.redirect('/admin')
    }).catch(next)
})
module.exports = router