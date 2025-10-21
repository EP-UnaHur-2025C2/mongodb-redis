const { Serie } = require('../models/series.model')

const crearSerie = async (req, res) => {
    try {
        const serie = new Serie(req.body)
        const guardado = await serie.save()
        res.status(201).json(guardado)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la serie' })
    }
}

const obtenerSeries = async (req, res) => {
    try {
        const series = await Serie.find()
        res.status(200).json(series)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las series' })
    }
}

const obtenerSerie = async (req, res) => {
    try {
        const id = req.params.id
        const serie = await Serie.findById(id)
        if(!serie) return res.status(404).json({ message: 'La serie no existe' })
        res.status(200).json(serie)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la serie' })
    }
}

const actualizarSerie = async (req, res) => {
    try {
        const id = req.params.id
        const serie = await Serie.findByIdAndUpdate(id, req.body)
        if(!serie) return res.status(404).json({ message: 'La serie no existe' })
        res.status(200).json(serie)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la serie' })
    }
}

const eliminarSerie = async (req, res) => {
    try {
        const id = req.params.id
        const eliminada = await Serie.findByIdAndDelete(id)
        if(!eliminada) return res.status(404).json({ message: 'La serie no existe' })
        res.status(200).json({ message: eliminada })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la serie' })
    }
}

const agregarTemporada = async (req, res) => {
  try {
    const { id } = req.params
    const { numero, capitulos } = req.body

    if (numero == null || capitulos == null) {
      return res.status(400).json({ message: 'numero y capitulos son requeridos' })
    }

    const serie = await Serie.findById(id)
    if (!serie) return res.status(404).json({ message: 'La serie no existe' })

    const existe = serie.temporadas.some(t => t.numero === Number(numero))
    if (existe) return res.status(409).json({ message: 'El número de temporada ya existe' })

    serie.temporadas.push({ numero, capitulos })
    await serie.save()

    res.status(201).json(serie)
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar temporada' })
  }
}

const obtenerTemporadasDeSerie = async (req, res) => {
  try {
    const { id } = req.params

    const serie = await Serie.findById(id)
    if (!serie) return res.status(404).json({ message: 'La serie no existe' })

    const temporadas = serie.temporadas.map(t => ({
      id: t._id,
      numero: t.numero,
      capitulos: t.capitulos
    }))

    res.status(200).json({ nombre: serie.nombre, temporadas })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las temporadas' })
  }
}

const obtenerTemporadaDeSerie = async (req, res) => {
  try {
    const { id, numTemp } = req.params
    if (isInvalidObjectId(id)) return res.status(400).json({ message: 'ID inválido' })

    const serie = await Serie.findById(id)
    if (!serie) return res.status(404).json({ message: 'La serie no existe' })

    const temp = serie.temporadas.find(t => t.numero === Number(numTemp))
    if (!temp) return res.status(404).json({ message: 'La temporada no existe' })

    res.status(200).json(temp)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la temporada' })
  }
}

const actualizarTemporada = async (req, res) => {
  try {
    const { id, idTemp } = req.params
    const { numero, capitulos } = req.body

    const serie = await Serie.findById(id)
    if (!serie) return res.status(404).json({ message: 'La serie no existe' })

    const temp = serie.temporadas.id(idTemp)
    if (!temp) return res.status(404).json({ message: 'La temporada no existe' })

    if (numero != null) {
      const existeNum = serie.temporadas.some(t => String(t._id) !== String(idTemp) && t.numero === Number(numero))
      if (existeNum) return res.status(409).json({ message: 'Ya existe una temporada con ese número' })
      temp.numero = numero
    }
    if (capitulos != null) temp.capitulos = capitulos

    await serie.save()

    res.status(200).json(temp)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la temporada' })
  }
}

const eliminarTemporada = async (req, res) => {
  try {
    const { id, idTemp } = req.params

    const serie = await Serie.findById(id)
    if (!serie) return res.status(404).json({ message: 'La serie no existe' })

    const temp = serie.temporadas.id(idTemp)
    if (!temp) return res.status(404).json({ message: 'La temporada no existe' })

    temp.deleteOne()
    await serie.save()

    res.status(200).json({ message: 'Temporada eliminada con exito' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la temporada' })
  }
}

module.exports = {
    crearSerie,
    obtenerSeries,
    obtenerSerie,
    actualizarSerie,
    eliminarSerie,
    agregarTemporada,
    obtenerTemporadasDeSerie,
    obtenerTemporadaDeSerie,
    actualizarTemporada,
    eliminarTemporada
}
