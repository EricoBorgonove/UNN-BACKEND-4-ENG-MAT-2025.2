const express = require ('express')
const port = 3000
const path = require ('path')
const app = express ()

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

app.listen (port, () => {
    console.log (`App rodando na porta ${port}`)
})