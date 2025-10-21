const mongoose = require('mongoose')

const conexionMongoDB = async (URI) => {
    try {
        await mongoose.connect(URI)
        console.log('Conectado a MongoDB')
    } catch (err) {
        console.error('Error al conectar:', err)
    }
}

module.exports = { conexionMongoDB }