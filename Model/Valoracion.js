const mongoose = require('mongoose');

const ValoracionSchema = new mongoose.Schema({
    pelicula: { type: String, required: true }, // Título de la película
    usuario: { type: String, required: true }, // Email del usuario autenticado
    puntuacion: { type: Number, required: true, min: 1, max: 5 }, // Puntuación entre 1 y 5
    timestamp: { type: Date, default: Date.now }, // Fecha y hora de la proyección
    token: { type: String, required: true }
});

module.exports = mongoose.model('Valoracion', ValoracionSchema);
