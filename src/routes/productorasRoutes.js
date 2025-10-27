const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/productoraController')

router.post('/', ctrl.crearProductora)
router.get('/', ctrl.obtenerProductoras)

module.exports = router