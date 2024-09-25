const mongoose = require('mongoose');
const configBD = require('../configuracion/bd.config');

const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}/${configBD.BASEDATOS}`;

async function conectar() {
    try {
        await mongoose.connect(url);
        console.log('Se ha establecido conexión a la base de datos');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

function obtenerBD() {
    return mongoose.connection;
}

module.exports = {
    conectar,
    obtenerBD
};