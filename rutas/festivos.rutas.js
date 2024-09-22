module.exports= (app) => {
    const express = require('express');
const controlador = require("../controladores/festivos.controlador");

app.get("/festivos", controlador.listar);
app.get("/festivos/:año/:mes/:dia", controlador.verificar);

}

