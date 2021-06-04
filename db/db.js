'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env //VAROAB;ES DE CONEXION CON MONGODB


const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_USER}=${DB_PASSWD}`
let connection

async function connectDB () {
  if (connection) return connection

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true , useUnifiedTopology: true
    })
    connection = client.db(DB_NAME)
    console.log('conexion correctamente')
  } catch (error) {
    console.error('No se puede conectar a la base de datos', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB