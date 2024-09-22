const express = require('express');
const app = express();

const bd = require('./repositorios/bd');
bd.conectar();

const puerto = 3030;
console.log('API Festivos Iniciada');

// Middleware para analizar JSON
app.use(express.json());

// Rutas
require('./rutas/festivos.rutas')(app);

// Escuchar en el puerto
app.listen(puerto, () => {
    console.log(`API Festivos escuchando por el puerto ${puerto}`);
});





/*


const año = 2025;
domingoRamos = fechas.obtenerSemanaSanta(año);
console.log(`Domingo de Ramos ${domingoRamos}`);

domingopascua = fechas.agregarDias(domingoRamos, 7);
console.log(`Domingo de Pascua ${domingopascua}`);

reyesMagos = fechas.siguienteLunes(new Date(año, 0, 6));
console.log(`Reyes Magos ${reyesMagos}`);*/