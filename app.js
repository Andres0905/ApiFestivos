const express = require('express');
const app = express();
const festivosRouter = require('./rutas/festivos.rutas');
const bd = require('./repositorios/bd');

bd.conectar();

const puerto = 3030;
console.log('API Festivos Iniciada');

app.use(express.json());

app.use('/festivos', festivosRouter);

app.listen(puerto, () => {
    console.log(`API Festivos escuchando por el puerto ${puerto}`);
});

