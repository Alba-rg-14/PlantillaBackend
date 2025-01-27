const express = require("express");
const PeliculasRouter = express.Router();
const axios = require("axios");
const Pelicula = require("../Model/Pelicula");

// GET /peliculas
PeliculasRouter.get("/", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).send
    }
});

// GET /peliculas/:id
PeliculasRouter.get("/:id", async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
});

//GET peliculas por titulo
PeliculasRouter.get("/titulo/:titulo", async (req, res) => {
    try {
        const peliculas = await Pelicula.find({ titulo: req.params.titulo });
        res.json(peliculas);
    } catch (error) {
        res.status(500).send();
    }
});

// POST /peliculas
PeliculasRouter.post("/", async (req, res) => {
    try {
        const pelicula = new Pelicula(req.body);
        await pelicula.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
});

// PUT /peliculas/:id
PeliculasRouter.put("/:id", async (req, res) => {
    try {
        await Pelicula.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

// DELETE /peliculas/:id
PeliculasRouter.delete("/:id", async (req, res) => {
    try {
        await Pelicula.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = PeliculasRouter;
