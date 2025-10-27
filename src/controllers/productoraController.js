const { Productora } = require('../models/productoras.model')

const crearProductora = async (req, res) => {
  try {
    const creada = await Productora.create(req.body)
    res.status(201).json(creada)
  } catch (e) {
    res.status(500).json({ message: 'Error al crear la productora' })
  }
}

const obtenerProductoras = async (_req, res) => {
  try {
    const list = await Productora.find().populate('series')
    res.status(200).json(list)
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener productoras' })
  }
}

module.exports = {
  crearProductora,
  obtenerProductoras
}