const express = require("express");
const ProyeccionRouter = express.Router();
const Proyeccion = require("../Model/Proyeccion");

//POST /proyecciones
ProyeccionRouter.post("/", async (req, res) => {
    try {
        const proyeccion = new Proyeccion(req.body);
        await proyeccion.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
});

//GET /proyecciones por nombre pelicula
ProyeccionRouter.get("/pelicula/:pelicula", async (req, res) => {
    try {
        const proyecciones = await Proyeccion.find({ pelicula: req.params.pelicula });
        res.json(proyecciones);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = ProyeccionRouter;
