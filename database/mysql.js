// importa el modulo
const sql = require('mysql')
//importa el archivo configuracion que contiene las llaves de la  base de datos
const config = require('../config')

//lee esos valores del archivo config
const dbConf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

//Crear la coneccion

let conecction;

function handleCon() {
    conecction = sql.createConnection(dbConf)
//esta funcion intenta la coexion siempre hasta conectarse
    conecction.connect((err)=>{
        if (err) {
            
            console.error('[db] error', err);
            setTimeout(handleCon, 2000)
        }else{

            console.log('conectada');
        }
    })
//esta funcion me reconecta en caso de perder la conexion  a internet, si es otro error, me imprime por consola el error
    conecction.on('error', err =>{
        console.error('[db] error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon() 
        }else{
            throw err
        }
    })
}

handleCon()
// liusta todos los datos de la  tabla que se le solicite
function list(table){
    return new Promise((resolve, reject)=>{
        conecction.query(`SELECT * FROM ${table}`, (err, data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
}
//realiza una busqueda dentro  de la base de datos, y devuelve una lista 
function query(table, query) {
    return new Promise((resolve, reject) =>{
        conecction.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) =>{
            if(err) return reject(err)
            resolve(result[0] || null)
        })
    })
}
//busca al paciente por id de caso o num de identificacion con un parametro del HTML (ID, identificacion)
function get(table, option, data){
    return new Promise((resolve, reject)=>{
        conecction.query(`SELECT * FROM ${table} WHERE ${option} =${data}`, (err, data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
}
//retorna el inserta en la tabla el dato
function upsert(table, data){
    return insert(table, data)
    
    
}
//Si un usuario está muerto ya no se puede hace mas nada.
function ultimo(table, query, query2){
    return new Promise((resolve, reject) =>{
        conecction.query(`SELECT Estado FROM ${table} WHERE ? AND ?`,[query,query2], (err, result) =>{
            if(err) return reject(err)
            resolve(result[0] || null)
        })
    })
}
//devuelve la direccion
function dir(table, query, query2){
    return new Promise((resolve, reject) =>{
        conecction.query(`SELECT direccionRes FROM ${table} WHERE ? AND ?`, [query, query2], (err, result) =>{
            if(err) return reject(err)
            resolve(result[0] || null)
        })
    })
}
//inserta un valor 
function insert(table, data){
    return new Promise((resolve, reject)=>{
        conecction.query(`INSERT INTO ${table} SET ?`, data, (err, result)=>{
            if(err) return reject(err)
            resolve(result)
        })
    })
}
//elimina un valor
function remove(table, id) {
    return new Promise((resolve, reject)=>{
        conecction.query(`DELETE FROM ${table} WHERE numIdentificacion=${id}`, (err, data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

//exporta las funicones para poder usarlas en el controller
module.exports = {
    list,
    query,
    upsert,
    get,
    remove,
    ultimo, 
    dir
}