const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const festivoSchema = new Schema({
    dia: { type: Number, required: true },
    mes: { type: Number, required: true },
    nombre: { type: String, required: true },
    diasPascua: { type: Number } 
});

const tiposSchema = new Schema({
    id: { type: Number, required: true },
    tipo: { type: String, required: true },
    modoCalculo: { type: String },
    festivos: [festivoSchema] 
});

module.exports = mongoose.model('Tipo', tiposSchema);