const env = process.env.NODE_ENV || 'dev'

const config2 = require('./config2.js')

const config = () =>{
    switch(env){
        case 'dev': return{
            bdstring: config2.conn_string,
            jwt_pass: config2.secret,
            jwt_expires_in: '7d',
            port: 3000
        }
        case 'hml': return{
            bdstring: config2.conn_string,
            jwt_pass: config2.secret,
            jwt_expires_in: '7d',
            port: 3000
        }
        case 'prod': return{
            bdstring: config2.conn_string,
            jwt_pass: config2.secret,
            jwt_expires_in: '7d',
            port: 3000
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`)

module.exports = config()
