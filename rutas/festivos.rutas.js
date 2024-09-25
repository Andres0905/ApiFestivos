const express = require('express');
const router = express.Router();
const { verificarFestivo  } = require('../controladores/festivos.controlador');

// Ruta para verificar si una fecha es festivo
router.get('/verificar/:anio/:mes/:dia', verificarFestivo);

module.exports = router; 