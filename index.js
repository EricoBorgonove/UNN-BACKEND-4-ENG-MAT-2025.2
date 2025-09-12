const express = require ('express')

const path = require ('path')
const app = express ()

require('dotenv').config()

app.use (express.static('./public'))
app.get('/teste',(req, res) =>{
    res.status(200).send ('Seja bem Vindo a essa bagaça')
})

app.get ('/', (req, res) =>{
    res.sendFile(path.resolve ('index.html'))
})

app.use ((req, res, next) =>{
    res.status(404).send("Rota Não Encontrada")
})

app.listen (process.env.PORT, () => {
    console.log (`App rodando na porta ${process.env.PORT}`)
})