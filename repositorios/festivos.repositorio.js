const bd = require('./bd');

const { obtenerSemanaSanta, agregarDias, siguienteLunes } = require('../servicios/calculo.fechas');// Importar tus funciones de cálculo

const festivoRepositorio  =  { };

// Función para listar festivos con sus fechas exactas
festivoRepositorio.verificar = async (respuesta, fechaEntrada) => {
    const basedatos = bd.obtenerBD(); // Obtener la conexión a la base de datos
    try {
        // Obtener los festivos desde la colección 'tipos'
        const tiposFestivos = await basedatos.collection('tipos').find({}).toArray();
        const año = fechaEntrada.getFullYear(); // Obtener el año de la fecha de entrada
        const fechaSemanaSanta = obtenerSemanaSanta(año);

        // Procesar cada tipo de festivo y calcular la fecha correspondiente
        const festivosConFechas = tiposFestivos.flatMap(tipo => {
            return tipo.festivos.map(festivo => {
                let fecha;

                // Si el festivo tiene un día y mes definido (fijo)
                if (festivo.dia && festivo.mes) {
                    fecha = new Date(año, festivo.mes - 1, festivo.dia);
                } 
                // Si el festivo está basado en días respecto a la Pascua (Semana Santa)
                else if (festivo.diasPascua !== undefined) {
                    fecha = agregarDias(fechaSemanaSanta, festivo.diasPascua);
                }

                // Si el festivo está sujeto a trasladarse al siguiente lunes
                if (tipo.tipo === 'Ley de Puente festivo') {
                    fecha = siguienteLunes(fecha);
                }

                return {
                    nombre: festivo.nombre,
                    fecha: fecha ? fecha.toISOString().split('T')[0] : null // Formato ISO YYYY-MM-DD
                };
            });
        });

        // Devolver la lista de festivos con sus fechas exactas
        return respuesta.status(200).send(festivosConFechas);

    } catch (error) {
        console.error('Error al listar los festivos', error);
        return respuesta.status(500).send({ mensaje: "Error al listar los festivos" });
    }
}

festivoRepositorio.listar = async (respuesta) => {
    const basedatos = bd.obtenerBD();  // Obteniendo la base de datos desde bd.js
    try {
        // Consultar la colección "tipos" y devolver nombres, días y meses de los festivos
        const resultado = await basedatos.collection('tipos')
            .find({}, { projection: { "festivos.nombre": 1, "festivos.dia": 1, "festivos.mes": 1, _id: 0 } })  // Proyectar nombre, día y mes
            .toArray();

        // Devolver el resultado al callback
        return respuesta(null, resultado);
    } catch (error) {
        console.error('Error al listar los festivos', error);
        respuesta(error, null);
    }
}

module.exports = festivoRepositorio;