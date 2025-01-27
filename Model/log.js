const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    email: { type: String, required: true },
    tokenExpiry: { type: Date, required: true },
    token: { type: String, required: false }
});

module.exports = mongoose.model('log', LogSchema);
