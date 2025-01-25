const express = require("express");
const logRouter = express.Router();
const Log = require("../Model/log"); // Asegúrate de que el modelo está correctamente importado

// Crear un log
logRouter.post("/", async (req, res) => {
    const { email, accion, detalles } = req.body;

    try {
        const nuevoLog = new Log({ email, accion, detalles, timestamp: new Date() });
        await nuevoLog.save();
        res.status(201).json(nuevoLog);
    } catch (error) {
        console.error("Error al guardar el log:", error);
        res.status(500).json({ message: "Error al guardar el log", error });
    }
});

module.exports = logRouter;
