const mongoose = require('mongoose');

const SalaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre de la sala
    propietarioEmail: { type: String, required: true }, // Email del usuario autenticado
    direccion: { type: String, required: true }, // Dirección de la sala
    coordenadas: {
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true },
    },
});

module.exports = mongoose.model('Sala', SalaSchema);
