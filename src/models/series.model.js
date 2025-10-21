const mongoose = require('mongoose')

const temporadaSchema = new mongoose.Schema({
    numero: { type: Number, required: true },
    capitulos: { type: Number, required: true }
})

const serieSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    estado: { type: String, enum: ['En emisión', 'Finalizada', 'Cancelada'], default: 'En emisión' },
    temporadas: [temporadaSchema]
}, {
    strict: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

const Serie = mongoose.model('Serie', serieSchema)

module.exports = { Serie }