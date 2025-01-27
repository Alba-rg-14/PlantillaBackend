const mongoose = require('mongoose');

const ProyeccionSchema = new mongoose.Schema({
    pelicula: { type: String, required: true }, // Título de la película
    sala: { type: String, required: true }, // Nombre de la sala
    timestamp: { type: Date, required: true }, // Fecha y hora de la proyección
});

module.exports = mongoose.model('Proyeccion', ProyeccionSchema);
