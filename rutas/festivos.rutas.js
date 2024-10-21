const express = require('express');
const router = express.Router();
const controlador = require('../controladores/festivos.controlador');

// Ruta para verificar si una fecha es festivo
router.get('/verificar/:anio/:mes/:dia', controlador.verificarFestivo);

// Ruta para listar los festivos de un año
router.get('/listar/:anio', controlador.listar);



module.exports = router;