const express = require('express')
const ctl = require('../handleRegister/')

const Controller = require('./index')

const router = express.Router()

router.get('/get', (req, res, next) => {
    Controller.list()
        .then((lista) => {
            res.render('helper', {
                lista,
            })
        })
        .catch(next)
})
router.post('/reg', (req, res, next) => {
    Controller.upsert(req.body)
        .then((result) => {
            res.redirect('/api/helper/get')
        }).catch(next)
})
router.get('/delete/:id', (req, res, next) => {
    let id= req.params.id
    console.log(id);
    Controller.remove(req.params.id)
    .then(() =>{
        res.redirect('/helper/')
    }).catch(next)
})
router.post('/get/pac', (req, res, next)=>{
    let opcion = req.body.opcion    
    let data = req.body.buscar
    ctl.get(opcion, data)
    .then((result) =>{
        res.render('infoHelper', {result})
    })
})
/*router.get('/info', (req, res, next)=>{
    res.render('infoHelper')
})*/

module.exports = router