const mongoose = require("mongoose");

const HijaSchema = new mongoose.Schema({
    entidadPadre: { type: mongoose.Schema.Types.ObjectId, ref: "Entidad", required: true }, // Relación con la entidad principal
    nombre: { type: String, required: true }, // Ejemplo: nombre de la reserva, participación, etc.
    descripcion: { type: String }, // Campo opcional para detalles
    fecha: { type: Date, required: true }, // Ejemplo: fecha de la reserva o participación
    datosAdicionales: { type: Object }, // Para campos específicos según el contexto del examen
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

module.exports = mongoose.model("Hija", HijaSchema);
