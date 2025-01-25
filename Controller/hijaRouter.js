const express = require("express");
const hijaRouter = express.Router();
const Hija = require("../Model/Hija");

// Crear una entidad hija
hijaRouter.post("/crear", async (req, res) => {
    const { entidadPadre, nombre, descripcion, fecha, datosAdicionales } = req.body;

    try {
        const nuevaHija = new Hija({
            entidadPadre,
            nombre,
            descripcion,
            fecha,
            datosAdicionales,
        });
        await nuevaHija.save();
        res.status(201).json({ mensaje: "Entidad hija creada exitosamente", hija: nuevaHija });
    } catch (error) {
        console.error("Error al crear la entidad hija:", error);
        res.status(500).json({ mensaje: "Error al crear la entidad hija", error });
    }
});

// Obtener todas las entidades hijas de una entidad padre
hijaRouter.get("/padre/:id", async (req, res) => {
    try {
        const hijas = await Hija.find({ entidadPadre: req.params.id });
        res.status(200).json(hijas);
    } catch (error) {
        console.error("Error al obtener las entidades hijas:", error);
        res.status(500).json({ mensaje: "Error al obtener las entidades hijas", error });
    }
});

// Actualizar una entidad hija
hijaRouter.put("/actualizar/:id", async (req, res) => {
    const { nombre, descripcion, fecha, datosAdicionales } = req.body;

    try {
        const hijaActualizada = await Hija.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, fecha, datosAdicionales },
            { new: true } // Retorna la entidad actualizada
        );

        if (!hijaActualizada) {
            return res.status(404).json({ mensaje: "Entidad hija no encontrada" });
        }

        res.status(200).json({ mensaje: "Entidad hija actualizada exitosamente", hija: hijaActualizada });
    } catch (error) {
        console.error("Error al actualizar la entidad hija:", error);
        res.status(500).json({ mensaje: "Error al actualizar la entidad hija", error });
    }
});

// Eliminar una entidad hija
hijaRouter.delete("/eliminar/:id", async (req, res) => {
    try {
        const hijaEliminada = await Hija.findByIdAndDelete(req.params.id);

        if (!hijaEliminada) {
            return res.status(404).json({ mensaje: "Entidad hija no encontrada" });
        }

        res.status(200).json({ mensaje: "Entidad hija eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar la entidad hija:", error);
        res.status(500).json({ mensaje: "Error al eliminar la entidad hija", error });
    }
});

module.exports = hijaRouter;
