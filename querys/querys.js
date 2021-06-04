'use strict'

const connectDb = require('../db/db')
const { ObjectID } = require('mongodb')
const errorHandler = require('../lib/errores')

module.exports = {
  getComunidades: async () => {

    let db
    let comunidades = []

    try {
      db = await connectDb()
      comunidades = await db.collection('comunidades').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return comunidades
  },
  getComunidad: async (root, { id }) => {
    
    let db
    let comunidad

    try {
      db = await connectDb()
      comunidad = await db.collection('comunidades').findOne({
        _id: ObjectID(id)
      })
    } catch (error) {
      errorHandler(error)
    }

    return comunidad
  }
}