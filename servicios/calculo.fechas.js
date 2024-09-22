
function obtenerSemanaSanta(año) {
    const a = año % 19;
    const b = año % 4;
    const c = año % 7;
    const d = (19 * a + 24) % 30;

    const dias = d + (2 * b + 4 * c + 6 * d + 5) % 7;
    let mes = 3;
    let dia = 15 + dias;
    if (dia > 31) {
        mes = 4;
        dia = dia - 31;
    }
    return new Date(año, mes - 1, dia)
}

function agregarDias(fecha, dias) {
    const fechaT = new Date(fecha);
    fechaT.setDate(fechaT.getDate() + dias);
    return fechaT;
}

function siguienteLunes(fecha) {
	while (fecha.getDay() !== 1) {
		fecha.setDate(fecha.getDate() + 1);
	}
	return fecha;
}

module.exports = {
    obtenerSemanaSanta,
    agregarDias,
    siguienteLunes
};