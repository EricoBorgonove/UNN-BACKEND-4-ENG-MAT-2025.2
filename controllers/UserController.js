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
            return res.status(201).json(user)
        }catch(error){
            return res.status(500).json({ 
                error: 'Erro ao criar usuário', error: error.message })
        }
    },
    // Read - Listar todos os usuários
    async getAllUsers (req, res){
        try{
            const users = await User.findAll({
                attributes: { exclude: ['senha'] }
            })
            return res.json(users)
    }catch(error){
            return res.status(500).json({ 
                error: 'Erro ao listar usuários', error: error.message })
        }
    },
    // Buscar usuário pelo ID
    async getUserById (req, res){
        try{
            const { id } = req.params
            const user = await User.findByPk(id,{
                attributes: { exclude: ['senha'] }
            })
            return res.json(user)
    }catch(error){
            return res.status(500).json({ 
                error: 'Erro ao listar usuários', error: error.message })
        }
    },
    // Update - Atualizar um usuário

    async updateUser (req, res){
        try{
            const { id } = req.params
            const {nome, cpf, email, senha, tipo_usuario} = req.body

            if (!['admin', 'user'].includes (tipo_usuario)){
                return res.status(400).json({ error: 'Tipo de usuário inválido' })
            }

            const user = await User.findByPk(id)
            if (!user){
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }
          
            await user.update ({nome, cpf, email, senha, tipo_usuario})
            return res.status(201).json(user)
        }catch(error){
            return res.status(500).json({ 
                error: 'Erro ao atualizar usuário', error: error.message })
        }
    },
    // Delete - exclusão do Usuário
    async deleteUser (req, res){
        try{
            const { id } = req.params
            const user = await User.findByPk(id)
            if (!user){
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }
            await user.destroy()
            return res.status(204).send()
        }catch(error){
            return res.status(500).json({
                error: 'Erro ao deletar usuário', error: error.message })
        }
    }
}