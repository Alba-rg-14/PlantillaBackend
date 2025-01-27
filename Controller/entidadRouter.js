const express = require("express");
const entidadRouter = express.Router();
const Entidad = require("../Model/entidad");
const axios = require("axios");

// Crear una entidad
entidadRouter.post("/crear", async (req, res) => {
    const { nombre, descripcion, creador, categoria, direccion, coordenadas, imagenes } = req.body;

    try {
        const nuevaEntidad = new Entidad({
            nombre,
            descripcion,
            creador,
            categoria,
            direccion,
            coordenadas,
            imagenes,
        });
        await nuevaEntidad.save();
        res.status(201).json({ mensaje: "Entidad creada exitosamente", entidad: nuevaEntidad });
    } catch (error) {
        console.error("Error al crear la entidad:", error);
        res.status(500).json({ mensaje: "Error al crear la entidad", error });
    }
});

// Obtener todas las entidades
entidadRouter.get("/todas", async (req, res) => {
    try {
        const entidades = await Entidad.find();
        res.status(200).json(entidades);
    } catch (error) {
        console.error("Error al obtener las entidades:", error);
        res.status(500).json({ mensaje: "Error al obtener las entidades", error });
    }
});

// Filtrar por cercanía a partir de una dirección
entidadRouter.get("/cercanos", async (req, res) => {
    const { direccion } = req.query; // Solo se pide la dirección, no el rango

    if (!direccion) {
        return res.status(400).json({ mensaje: "La dirección es requerida" });
    }

    try {
        // Paso 1: Obtener latitud y longitud de la dirección usando Nominatim
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`;
        const response = await axios.get(url);

        if (response.data.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron resultados para la dirección proporcionada" });
        }

        const { lat, lon } = response.data[0]; // Coordenadas obtenidas

        // Paso 2: Definir un rango fijo
        const rangoFijoKm = 10; // Rango fijo de 10 km
        const rangoGrados = rangoFijoKm / 111; // Aproximación: 1° ≈ 111 km

        const minLat = parseFloat(lat) - rangoGrados;
        const maxLat = parseFloat(lat) + rangoGrados;
        const minLon = parseFloat(lon) - rangoGrados;
        const maxLon = parseFloat(lon) + rangoGrados;

        // Paso 3: Filtrar entidades por rangos de latitud y longitud
        const entidadesCercanas = await Entidad.find({
            "coordenadas.latitud": { $gte: minLat, $lte: maxLat },
            "coordenadas.longitud": { $gte: minLon, $lte: maxLon },
        });

        res.status(200).json(entidadesCercanas);
    } catch (error) {
        console.error("Error al buscar entidades cercanas:", error);
        res.status(500).json({ mensaje: "Error al buscar entidades cercanas", error });
    }
});

// Filtrar entidades por parte de su nombre
entidadRouter.get("/nombre/:nombre", async (req, res) => {

    try {
        const { nombre } = req.params;
        console.log("Buscando por nombre:", nombre); // Verifica el filtro que llega
        const entidades = await Entidad.find({ nombre: { $regex: nombre, $options: "i" } });
        res.status(200).json(entidades);
        console.log("Entidades encontradas:", entidades); // Verifica las entidades encontradas
    } catch (error) {
        console.error("Error al buscar entidades por nombre:", error);
        res.status(500).json({ mensaje: "Error al buscar entidades por nombre", error });
    }
});

// Borrar una entidad
entidadRouter.delete("/borrar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const entidadEliminada = await Entidad.findByIdAndDelete(id);

        if (!entidadEliminada) {
            return res.status(404).json({ mensaje: "Entidad no encontrada" });
        }

        res.status(200).json({ mensaje: "Entidad eliminada exitosamente", entidad: entidadEliminada });
    } catch (error) {
        console.error("Error al borrar la entidad:", error);
        res.status(500).json({ mensaje: "Error al borrar la entidad", error });
    }
});

// Actualizar una entidad
entidadRouter.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, creador, categoria, direccion, coordenadas } = req.body;

    try {
        const entidadActualizada = await Entidad.findByIdAndUpdate(
            id,
            { nombre, descripcion, creador, categoria, direccion, coordenadas },
            { new: true, runValidators: true }
        );

        if (!entidadActualizada) {
            return res.status(404).json({ mensaje: "Entidad no encontrada" });
        }

        res.status(200).json({ mensaje: "Entidad actualizada exitosamente", entidad: entidadActualizada });
    } catch (error) {
        console.error("Error al actualizar la entidad:", error);
        res.status(500).json({ mensaje: "Error al actualizar la entidad", error });
    }
});

// Obtener una entidad por su ID
entidadRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const entidad = await Entidad.findById(id);

        if (!entidad) {
            return res.status(404).json({ mensaje: "Entidad no encontrada" });
        }

        res.status(200).json(entidad);
    } catch (error) {
        console.error("Error al obtener la entidad:", error);
        res.status(500).json({ mensaje: "Error al obtener la entidad", error });
    }
});

module.exports = entidadRouter;
