//importa el servid
const express = require('express') //inicia todo lo del servidor
const path = require('path') // permite el manejo de rutas del servidor
const cookie = require('cookie-parser') //sirve para manejo de cookies, mas no está en uso
const session = require('express-session') //lo mismo de las cookies pero mayor seguridad, No en  uso

// acceso a carpetas del proyecto, las cuales contienen archivos de configuracion y rutas
const config = require('../config')  //contiene las llaves de las databases y los puertos
const admin = require('./admin/network') //rutas de acceso del admin
const auth = require('./auth/network')  //rutas para validar el login
const helper = require('./helper/network')  //rutas para el modulo de ayudante
const handle = require('./handleRegister/network') //rutas para el manejo de los estados
const doc = require('./doctor/network')  //rutas para el modulo del medico
const map = require('./public/finaljs') //define la ruta del mapa, mas no se terminó



//inicicializacion de los modulos de node
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookie())
app.use(session({
    secret: 'secretKey_!',
    resave: false,
    saveUninitialized: false
}))


//uso de archivos estaticos, como css, y los javascript que no tengan que ver con el servidor
app.use('/public', express.static(path.join(__dirname,'/public')))

//se define el uso de las Plantillas html que estan formato pug por comodidad
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


//inicializacion de las rutas de cada modulo
app.use('/api/users', admin)
app.use('/api/auth', auth) //validacion del login
app.use('/api/helper', helper) //ayudante
app.use('/api/handle', handle) //seguimiento del paciente. cuando estoy en modulo ayudante y le doy Buscar, me envia a esta ruta
app.use('/doc', doc) //modulo medico
app.use('/' ,map) //una vez el medico  buscaba el mapa, me dirigia a esta ruta (no funciona)


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
app.get('/success', (req, res)=>{
    res.render('regSuccess')
})

//inicializa el servidor   con app.listen(le digo que me muestre la web en el puertoq ue esta definido en el archivo config)
app.listen(config.api.port, ()=>{
    console.log('Api en el puerto ', config.api.port);
})