'use strict'

//FUNCION DE ERRORES DEL SERVIDOR
function errorHandler(error){
    console.error(error)
    throw new Error('Fallo en la operacion del servidor')
}

module.exports = errorHandler