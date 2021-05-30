const express =  require('express')
const router = express.Router()

router.get('/admin',(req, res)=>{
    res.render('admin',{
        usuario: req.cookies.usuario
    })
})

router.get('/doc',(req, res) =>{
    res.render('doc',{
        usuario: req.cookies.usuario
    })
})

router.get('/helper',(req, res) => {
    res.send('admin', {
        usuario: req.cookies.usuario
    })
})