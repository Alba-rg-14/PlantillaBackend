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




module.exports = entidadRouter;
