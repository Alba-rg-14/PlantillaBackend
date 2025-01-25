const mongoose = require('mongoose');

const EntidadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    creador: { type: String, required: true }, // Ejemplo: email o ID del usuario
    categoria: { type: String, required: true }, // Ejemplo: "Restaurante", "Evento"
    direccion: { type: String, required: true }, // Dirección completa
    coordenadas: {
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true },
    },
    imagenes: [String], // URLs de imágenes subidas
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

module.exports = mongoose.model('Entidad', EntidadSchema);
