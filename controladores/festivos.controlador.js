const festivoRepositorio = require('../repositorios/festivos.repositorio');

exports.verificar = (solicitud, respuesta) => {

const año = parseInt(solicitud.params.año);
const mes = parseInt(solicitud.params.mes);
const dia = parseInt(solicitud.params.dia);
const fechaT = solicitud.Date;
console.log(fechaT);
        const fechaEntrada = new Date(año, mes - 1, dia); // Ajuste del mes
    if (isNaN(fechaEntrada)) {
        return respuesta.status(400).send({ mensaje: "Fecha inválida" });
    }

    // Llamar al repositorio para obtener los festivos
    festivoRepositorio.verificar(respuesta, fechaEntrada);
};

exports.listar = (solicitud, respuesta) => {
    festivoRepositorio.listar((error, datos) => {
        if(error) {
            return respuesta.status(500).send(
                {
                    mensaje: "Error obteniendo la lista de paises"
                }
            );
        }
        return respuesta.send(datos);
    });
}
