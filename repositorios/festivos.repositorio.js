const mongoose = require('mongoose');
const { obtenerSemanaSanta, agregarDias, siguienteLunes } = require('../servicios/calculo.fechas');
const Tipo = require('../modelos/festivos');

async function verificarFestivo(fecha) {
    try {
        const anio = fecha.getFullYear();
        const { festivosPuente, festivoPascua, festivoSemSanta } = await obtenerFestivosAgrupadosPorTipo();

        // 1. Verificar festivos fijos

        const festivoFijo = await Tipo.findOne({
            tipo: 'Fijo',
            'festivos.dia': fecha.getDate(),
            'festivos.mes': (fecha.getMonth() + 1)
        });
        if (festivoFijo) {
            const festivoEncontrado = festivoFijo.festivos.find(f => f.dia === fecha.getDate() && f.mes === (fecha.getMonth() + 1));
            if (festivoEncontrado) {
                return { verificarFestivo: true, nombre: festivoEncontrado.nombre };
            }
        }

        // 2. Verificar festivos de la Ley de Puente festivo
        for (let i = 0; i < festivosPuente.length; i++) {
            const fechaFestivo = new Date(anio, festivosPuente[i].mes - 1, festivosPuente[i].dia);
            const fechaFestivoTrasladada = siguienteLunes(new Date(fechaFestivo));
            if (fechaFestivoTrasladada.getTime() === fecha.getTime()) {
                return { verificarFestivo: true };
            }
        }

        // 3. Verificar festivos relacionados con la semana santa
        for (let i = 0; i < festivoSemSanta.length; i++) {
            const diaPascua = festivoSemSanta[i].diasPascua;
            const fechaPascua = obtenerSemanaSanta(anio);
            const fechaFestivoTrasladada = agregarDias(fechaPascua, diaPascua);
            if (fechaFestivoTrasladada.getTime() === fecha.getTime()) {
                return { verificarFestivo: true };
            }
        }

        // 4. Verificar festivos relacionados con los dias de pascua
        for (let i = 0; i < festivoPascua.length; i++) {
            const diaPascua = festivoPascua[i].diasPascua;
            fechaPascua = obtenerSemanaSanta(anio);
            const fechaFestivoTrasladada = agregarDias(fechaPascua, diaPascua);
            const fechaFestivoTrasladada2 = siguienteLunes(new Date(fechaFestivoTrasladada));
            if (fechaFestivoTrasladada2.getTime() === fecha.getTime()) {
                return { verificarFestivo: true };
            }
        }
        // Si no se encontró festivo
        return { verificarFestivo: false };

    } catch (error) {
        console.error('Error al verificar el festivo:', error);
        return { verificarFestivo: false, error: 'Error al verificar el festivo.' };
    }
}

const obtenerFestivosAgrupadosPorTipo = async () => {
    let festivosPuente = [];
    let festivoPascua = [];
    let festivoSemSanta = [];
    try {

        const festivosPuenteResult = await Tipo.findOne({ id: 2 });

        if (festivosPuenteResult && Array.isArray(festivosPuenteResult.festivos)) {
            festivosPuente = festivosPuenteResult.festivos.map(festivo => ({
                dia: festivo.dia,
                mes: festivo.mes,
                nombre: festivo.nombre
            }));
        } else {
            console.warn('El campo festivos no es un arreglo.');
        }


        const festivospascuaSemSanta = await Tipo.findOne({ id: 3 });

        if (festivospascuaSemSanta && Array.isArray(festivospascuaSemSanta.festivos)) {
            festivoSemSanta = festivospascuaSemSanta.festivos.map(festivo => ({
                nombre: festivo.nombre,
                diasPascua: festivo.diasPascua
            }));
        } else {
            console.warn('El campo festivospascuaSemSanta no es un arreglo.');
        }

        const festivospascuaResult = await Tipo.findOne({ id: 4 }); // Usar findOne

        if (festivospascuaResult && Array.isArray(festivospascuaResult.festivos)) {
            festivoPascua = festivospascuaResult.festivos.map(festivo => ({
                nombre: festivo.nombre,
                diasPascua: festivo.diasPascua
            }));
        } else {
            console.warn('El campo festivospascuaResult no es un arreglo.');
        }


        return {
            festivosPuente,
            festivoSemSanta,
            festivoPascua
        }

    }

    catch (error) {
        console.error('Error al obtener los festivos:', error.message);  // Imprimir el mensaje del error
        throw new Error('Error al obtener los festivos de la base de datos: ' + error.message);  // Agregar detalles adicionales al error
    }
};

module.exports = { verificarFestivo, obtenerFestivosAgrupadosPorTipo };