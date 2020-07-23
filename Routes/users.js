const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Users = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


//funcao auxiliar
const createUserToken = (userId) =>{
    return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: config.jwt_expires_in})
}

router.get('/', async (req, res)=>{
    try {
        const users = await Users.find({})
        return res.status().send(users)
    } catch (err) {
        return res.status(500).send({error: 'Erro na consulta de usuarios!'})
    }
})

router.post('/create', async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'})
    try {
        const userEmail = await Users.findOne({email})
        if(userEmail) return res.status(400).send({error: 'Usuario já registrado'})
    } catch (err) {
        return res.status(500).send({error: 'Erro ao buscar usuario ' + err})
    }
    try {
        const userCreated = await Users.create(req.body)
        userCreated.password = undefined
        return res.status(201).send({userCreated, token: createUserToken(userCreated.id)})
    } catch (err) {
        return res.status(500).send({error: 'Erro ao criar usuario '+ err})
    }
})

// router.post('/create', (req, res)=>{
//     // Users.findOne({email: email})
//     Users.findOne({email}, (err, data)=>{
//         if(data) return res.send({error: 'usuario ja registrado'})

//         Users.create(req.body, (err, data)=>{
//             if (err) return res.send({error: 'erro ao criar usuario'})
//             return res.send(data)
//         })
//     })
// })

router.post('/auth', async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'})
    let userEmail = {}
    try {
        userEmail = await Users.findOne({email}).select('+password')
        if(!userEmail) return res.status(400).send({error: 'Usuario não registrado'})
    } catch (err) {
        return res.status(500).send({error: 'Erro buscando usuario '+err})
    }
    try {
        const ok = await bcrypt.compare(String(password), String(userEmail.password))
        if(!ok) return res.status(401).send({error: 'Erro na senha'})
        console.log('OKOKOK')
        userEmail.password = undefined
        // return res.send(userEmail)
        return res.send({userEmail, token: createUserToken(userEmail.id)})
    }
     catch (err) {
        return res.status(500).send({error: 'Erro criptografia '+err})
    }
})

// router.post('/auth', (req, res)=>{
//     const {email , password } = req.body
//     if(!email || !password){
//         return res.send({error: 'Dados insuficientes'})
//     }
//     Users.findOne({email}, (err, data)=>{
//         if(err) return res.send({error: 'Erro buscando usuario'})
//         if(!data) return res.send({error: 'Usuario não registrado'})
//         bcrypt.compare(String(password), String(data.password),(err, same)=>{ //same é boolean
//             if(!same)  return res.send({error: 'Erro na senha'})
//             console.log('OKOKK')
//             data.password = undefined
//             return res.send(data)
//         })

//     }).select('+password')
// })

module.exports = router
