function obtenerSemanaSanta(anio) {
    const a = anio % 19;
    const b = anio % 4;
    const c = anio % 7;
    const d = (19 * a + 24) % 30;
    const e = (2 * b + 4 * c + 6 * d + 5) % 7;

    let dia = 22 + d + e;
    let mes = 3;

    if (dia > 31) {
        mes = 4;
        dia = dia - 31;
    }

    if (dia === 26 && mes === 4) {
        dia = 19;
    }
    if (dia === 25 && mes === 4 && d === 28 && e === 6 && a > 10) {
        dia = 18;
    }
    const fechaPascua = new Date(anio, mes - 1, dia);
    return fechaPascua;
}

function agregarDias(fechaPascua, diasDesdePascua) {
    const fecha = new Date(fechaPascua);
    fecha.setDate(fecha.getDate() + diasDesdePascua);
    return fecha;
}

function siguienteLunes(fechaFestivo) {
    const diaSemana = fechaFestivo.getDay();
    if (diaSemana >= 2 && diaSemana <= 6) {
        fechaFestivo.setDate(fechaFestivo.getDate() + (8 - diaSemana));
    }
    return fechaFestivo;
}

module.exports = {
    obtenerSemanaSanta,
    agregarDias,
    siguienteLunes
};