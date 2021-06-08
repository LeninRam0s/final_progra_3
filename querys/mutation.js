'use strict'

const connectDb = require('../db/db')//Ubicacion del Archivo DB
const { ObjectID } = require('mongodb')
const errorHandler = require('../lib/errores')

module.exports = {
    createComunidad: async (root, { input }) => {
        const defaults = {
            status: false
        }
        const newComunidad = Object.assign(defaults, input)
        let db
        let comunidad
        try {
            db = await connectDb()
            comunidad = await db.collection('comunidades').insertOne(newComunidad)
            newComunidad._id = comunidad.insertedId
        } catch (error) {
          errorHandler(error)
        }
        return newComunidad
    },
    editComunidad: async (root, { _id, input }) => {
        let db
        let comunidad
    
        try {
          db = await connectDb()
          await db.collection('comunidades').updateOne(
            { _id: ObjectID(_id) },
            { $set: input }
          )
          comunidad = await db.collection('comunidades').findOne(
            { _id: ObjectID(_id) }
          )
        } catch (error) {
          errorHandler(error)
        }
    
        return comunidad
      }
      

}