const express = require("express");
const ValoracionRouter = express.Router();
const Valoracion = require("../Model/Valoracion");

//POST /valoraciones
ValoracionRouter.post("/", async (req, res) => {
    try {
        const valoracion = new Valoracion(req.body);
        await valoracion.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
});

//GET /valoraciones por nombre pelicula
ValoracionRouter.get("/pelicula/:pelicula", async (req, res) => {
    try {
        const valoraciones = await Valoracion.find({ pelicula: req.params.pelicula });
        res.json(valoraciones);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = ValoracionRouter;