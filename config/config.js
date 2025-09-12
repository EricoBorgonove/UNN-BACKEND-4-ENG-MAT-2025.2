require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB.USER,
    "password": process.env.DB.PASSWORD,
    "database": process.env.DB.DATABASE,
    "host": process.env.DB.HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB.USER,
    "password": process.env.DB.PASSWORD,
    "database": process.env.DB.DATABASE,
    "host": process.env.DB.HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB.USER,
    "password": process.env.DB.PASSWORD,
    "database": process.env.DB.DATABASE,
    "host": process.env.DB.HOST,
    "dialect": "mysql"
  }
}
