const express =  require('express')

const Controller = require('../doctor')

const router = express.Router()

router.get('/', (req, res) =>{
    Controller.list()
    .then((lista)=>{
        res.render('doc',{
            lista
        })
    })
})

    
module.exports = router