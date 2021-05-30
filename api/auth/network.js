const express = require('express')
const cookie = require('cookie-parser')

const Controller = require('./index')

const router = express.Router()
router.use(cookie())

router.post('/home', (req, res, next) => {
    Controller.login(req.body.username, req.body.password)
    .then(datos =>{
        if(datos.rol === 'Administrador'){
            res.redirect('/admin')
        }else if(datos.rol === 'Medico'){
           res.redirect('/doc')
        }else if(datos.rol === 'Practicante'){
           res.redirect('/helper')
        }
    })
    .catch(next)
})
    
router.get('/login', (req, res)=>{
    res.render('login')
})



module.exports = router