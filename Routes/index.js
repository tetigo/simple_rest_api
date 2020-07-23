const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Users = require('../model/user')

router.get('/', auth, async (req, res)=>{
    // return res.send({message: 'TUdo OK com o metodo GET da raiz!'})
    console.log(res.locals.auth_data)
    const usu_id = res.locals.auth_data.id
    const usuario = await Users.findOne({_id:usu_id})
    console.log(usuario.email)
    return res.send({message: 'Essa info é muito importante!\nSomente autorizados devem ver'})
})


router.post('/', (req, res)=>{
    return res.send({message: 'TUdo OK com o metodo POST da raiz!'})
})


module.exports = router


/* status code
200 = OK --> res.send
201 = CREATED
202 - ACCEPTED -- aceitei a requisicao mas ainda estou processando

400 = Bad Request
401 - Unauthorized - autenticação, tem carater temporario (pega o token certo, a senha certa e volta aqui que vai dar certo)
403 - forbidden = autorização, tem carater permanente (nao adianta mudar senha nem nada, não tem acesso)
404 - Not found = nao tem o endpoint

500 - Internal Server Error
501 = Not implemented = a API nao suporta essa funcionalidade
503 - Service Unavailable = a API executa essa operação, mas no momento está indisponível





*/