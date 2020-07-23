const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
// const PORT = 3000
const config = require('./config/config')

const app = express()

const url = config.bdstring

const options = {
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('error', (err)=>{
    console.log('erro na conexao com o bando de dados'+err)
})
mongoose.connection.on('connected', ()=>{
    console.log('aplicacao conectada ao banco de dados')
})
mongoose.connection.on('disconnected', ()=>{
    console.log('aplicacao desconectada do bando de dados')
})

//body parser
//ao enviar requisicao com body (post) com object, ele precisa aprender a parsear o objeto
//senão não consegue pegar o objecto recebido pelo req
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const indexRoutes = require('./Routes/index')
const usersRoutes = require('./Routes/users')

app.use('/', indexRoutes)
app.use('/users', usersRoutes)

// app.get('/', (req, res)=>{
//     let obj = req.query
//     res.send({message: 'Tudo OK  com o metodo GET', name: `${obj.name}`, age: `${obj.age}`})
// })

// app.post('/', (req, res)=>{
//     console.log(req.body)
//     res.send({message: 'Tudo OK com o metodo POST'})
// })

app.listen(config.port, ()=> console.log(`servidor ouvindo na porta ${config.port}`))

module.exports = app




