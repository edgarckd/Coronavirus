const express = require('express');
const cookie = require('cookie-parser');
const { response } = require('express');

const app = express();
app.use(cookie())

const salir = document.getElementById('exit')
salir.onclick = function limpiar(cookie){
    response.clearCookie(cookie)
    console.log(req.cookies);
}