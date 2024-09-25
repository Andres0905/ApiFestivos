const { verificarFestivo } = require('../repositorios/festivos.repositorio');

exports.verificarFestivo = async (solicitud, respuesta) => {
    const { anio, mes, dia } = solicitud.params;

    const anioNum = parseInt(anio, 10);
    const mesNum = parseInt(mes, 10);
    const diaNum = parseInt(dia, 10);


    if (isNaN(anioNum) || anioNum.toString().length !== 4) {
        return respuesta.status(400).json({ error: 'El año debe ser un número de 4 dígitos' });
    }


    if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
        return respuesta.status(400).json({ error: 'El mes debe estar entre 1 y 12' });
    }

    const diasEnMes = new Date(anioNum, mesNum, 0).getDate();
    if (isNaN(diaNum) || diaNum < 1 || diaNum > diasEnMes) {
        return respuesta.status(400).json({ error: `El día debe estar entre 1 y ${diasEnMes} para el mes proporcionado` });
    }


    const fecha = new Date(anioNum, mesNum - 1, diaNum);
    if (isNaN(fecha.getTime())) {
        return respuesta.status(400).json({ error: 'Fecha no válida' });
    }

    try {
        const resultado = await verificarFestivo(fecha);
        respuesta.set('Content-Type', 'text/xml');

        const resultadoTexto = resultado.verificarFestivo ? "Es Festivo" : "No es festivo";

        respuesta.send(resultadoTexto);
    } catch (error) {
        console.error('Error al verificar la fecha:', error);
        respuesta.status(500).json({ error: 'Error interno del servidor' });
    }
};
