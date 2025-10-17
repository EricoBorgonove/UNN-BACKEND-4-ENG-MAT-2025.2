const { User } = require ('../models')
const { Op } = require ('sequelize')

module.exports = {
    // create - Cadastrar um novo usuário

    async createUser (req, res){
        try{
            const {nome, cpf, email, senha, tipo_usuario} = req.body

            if (!['admin', 'user'].includes (tipo_usuario)){
                return res.status(400).json({ error: 'Tipo de usuário inválido' })
            }
            const emailExistente = await User.findOne({where: { email }})
            if (emailExistente){
                return res.status(400).json({ error: 'Email já cadastrado' })
            }
            const user = await User.create ({nome, cpf, email, senha, tipo_usuario})
        }catch{
            return res.status(500).json({ 
                error: 'Erro ao criar usuário', error: error.message })
        }
    }
}