const api = {
    port: process.env.PORT || 4000
}
const jwt= {
    secret: process.env.JWT_SECRET || 'notansecreto!'
}
const mysql = {
    host : process.env.MYSQL_HOST || 'telematica-covid.cenhvg7ksmup.us-east-1.rds.amazonaws.com',
    user: process.env.MYSQL_USER || 'admin',
    password: process.env.MYSQL_PASSWORD || 'SisCovid97',
    database: process.env.MYSQL_DATABASE || 'Telematica_Covid',
}

module.exports = {
    api, 
    mysql,  
    jwt,
}