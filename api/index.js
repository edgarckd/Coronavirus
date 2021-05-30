const express = require('express')
const path = require('path')
const cookie = require('cookie-parser')
const session = require('express-session')

const config = require('../config')
const admin = require('./admin/network')
const auth = require('./auth/network')
const helper = require('./helper/network')




const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookie())
app.use(session({
    secret: 'secretKey_!',
    resave: false,
    saveUninitialized: false
}))


//uso de archivos estaticos
app.use('/public', express.static(path.join(__dirname,'/public')))

//Plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


//routes
app.use('/api/users', admin)
app.use('/api/auth', auth)
app.use('/api/helper', helper)


app.get('/admin', (req, res) => {
    res.render('admin')
})
app.get('/doc', (req, res) => {
    res.render('doc')
})
app.get('/helper', (req, res) => {
    res.render('helper')
})
app.get('/api/home', (req, res)=>{
    delete req.cookies.token
    console.log(req.cookies.token);
    res.render('home')
})

app.listen(config.api.port, ()=>{
    console.log('Api en el puerto ', config.api.port);
})