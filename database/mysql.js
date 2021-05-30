const sql = require('mysql')

const config = require('../config')

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

    conecction.connect((err)=>{
        if (err) {
            
            console.error('[db] error', err);
            setTimeout(handleCon, 2000)
        }else{

            console.log('conectada');
        }
    })

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

function list(table){
    return new Promise((resolve, reject)=>{
        conecction.query(`SELECT * FROM ${table}`, (err, data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
}
function query(table, query) {
    return new Promise((resolve, reject) =>{
        conecction.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) =>{
            if(err) return reject(err)
            resolve(result[0] || null)
        })
    })
}
function get(table, option, data){
    return new Promise((resolve, reject)=>{
        conecction.query(`SELECT * FROM ${table} WHERE ${option} =${data}`, (err, data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
}
function upsert(table, data){
    return insert(table, data)
    
    
}
function insert(table, data){
    return new Promise((resolve, reject)=>{
        conecction.query(`INSERT INTO ${table} SET ?`, data, (err, result)=>{
            if(err) return reject(err)
            resolve(result)
        })
    })
}
function remove(table, id) {
    return new Promise((resolve, reject)=>{
        conecction.query(`DELETE FROM ${table} WHERE numIdentificacion=${id}`, (err, data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}


module.exports = {
    list,
    query,
    upsert,
    get,
    remove
}