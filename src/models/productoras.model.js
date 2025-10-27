const mongoose = require('mongoose')

const productoraSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true }
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

productoraSchema.virtual('series', {
    ref: 'Serie',
    localField: '_id',
    foreignField: 'productora'
})

const Productora = mongoose.model('Productora', productoraSchema)

module.exports = { Productora }