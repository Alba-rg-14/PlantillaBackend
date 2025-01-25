const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    email: { type: String, required: true },
    tokenExpiry: { type: Date, required: false }, // Podría ser opcional si es para acciones distintas a autenticación
    token: { type: String, required: false },    // Podría ser opcional también
    accion: { type: String, required: true },    // Acción realizada: "Inicio de sesión", "Eliminar", etc.
    detalles: { type: Object }                   // Datos adicionales del log
});

module.exports = mongoose.model('Log', LogSchema);
