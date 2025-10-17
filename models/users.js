'use strict';
const bcrypt = require('bcrypt.js')
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {}
      
    async validarSenha (senhaDigitada){
      return await bcrypt.compare(senhaDigitada,this.senha);
    } 
    
  }
  Users.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {notEmpty: true}
    },
    cpf:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        args:  /^\d{11}$/,
        msg: 'O CPF deve conter 11 digitos numéricos'
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        args:  [6],
        msg: 'A senha deve conter pelo menos 6 digitos'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: 'email inválido'}
      }   
    },   
    tipo_usuario: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    }
    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',

    hooks:{
      beforeCreate: async (user,options) =>{
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
      },
      beforeUpdate: async (user,options) =>{
        if(user.changed('senha')){
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        }
      }
    }
  });
  return Users;
};