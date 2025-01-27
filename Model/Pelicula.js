const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true }, // Título de la película
    imagenURI: { type: String, required: true }, // URL del cartel
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);
