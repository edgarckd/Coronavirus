const express =  require('express')

const Controller = require('../handleRegister')

const router = express.Router()

router.post('/reg',(req, res, next) =>{
    Controller.upsert(req.body)
    .then((result) =>{
        res.redirect('/api/helper/get/')
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

module.exports = router