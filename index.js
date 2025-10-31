require('dotenv').config()

const cors = require('cors');
const express = require ('express')
const path = require ('path')
const app = express ()
const userRoutes = require('./routes/usersRoutes');


app.use (cors());
// habilitar o cors para dominios específicos
app.use (cors({origin: "http:localhost:5173"}));
app.use (express.static('./public'))
app.use (express.json())

app.use('/users', userRoutes);



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