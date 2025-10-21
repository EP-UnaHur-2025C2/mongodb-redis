const { Router } = require('express')
const serieController = require('../controllers/seriesController')
const router = Router()

router.post('/', serieController.crearSerie)
router.get('/', serieController.obtenerSeries)
router.get('/:id', serieController.obtenerSerie)
router.put('/:id', serieController.actualizarSerie)
router.delete('/:id', serieController.eliminarSerie)

router.post('/:id/temporadas', serieController.agregarTemporada)
router.get('/:id/temporadas', serieController.obtenerTemporadasDeSerie)
router.get('/:id/temporadas/:numTemp', serieController.obtenerTemporadaDeSerie)
router.put('/:id/temporadas/:idTemp', serieController.actualizarTemporada)
router.delete('/:id/temporadas/:idTemp', serieController.eliminarTemporada)

module.exports = router