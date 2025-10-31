'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}

    async validarSenha(senhaDigitada) {
      return await bcrypt.compare(senhaDigitada, this.senha);
    }
  }

  Users.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'O nome não pode estar vazio' },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: /^\d{11}$/,
            msg: 'O CPF deve conter exatamente 11 dígitos numéricos',
          },
        },
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: 'A senha deve conter pelo menos 6 caracteres',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Email inválido' },
        },
      },
      tipo_usuario: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        },
        beforeUpdate: async (user, options) => {
          if (user.changed('senha')) {
            const salt = await bcrypt.genSalt(10);
            user.senha = await bcrypt.hash(user.senha, salt);
          }
        },
      },
    }
  );

  return Users;
};
