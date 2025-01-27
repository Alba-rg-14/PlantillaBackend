const express = require("express");
const SalasRouter = express.Router();
const Sala = require("../Model/Sala");

//GET /salas en las que se pyojecta una pelicula dada por su nombre
SalasRouter.get("/pelicula/:nombre", async (req, res) => {
    try {
        const salas = await Sala.find();
        const salasConPelicula = salas.filter(sala => sala.peliculas.includes(req.params.nombre));
        res.json(salasConPelicula);
    } catch (error) {
        res.status(500).send();
    }
});

// GET /salas
SalasRouter.get("/", async (req, res) => {
    try {
        const salas = await Sala.find();
        res.json(salas);
    } catch (error) {
        res.status(500).send();
    }
});

// GET /salas/:id
SalasRouter.get("/:id", async (req, res) => {
    try {
        const sala = await Sala.findById(req.params.id);
        if (sala) {
            res.json(sala);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
});

// POST /salas
SalasRouter.post("/", async (req, res) => {
    try {
        const { nombre, direccion, coordenadas } = req.body;

        // Asegúrate de que el usuario está autenticado y obtén su email
        const propietarioEmail = req.user?.email || req.body.propietarioEmail;

        if (!nombre || !direccion || !coordenadas || !propietarioEmail) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const nuevaSala = new Sala({
            nombre,
            direccion,
            coordenadas,
            propietarioEmail,
        });

        await nuevaSala.save();
        res.status(201).json({ message: "Sala creada con éxito" });
    } catch (error) {
        console.error("Error al crear la sala:", error);
        res.status(500).json({ message: "Error al crear la sala", error });
    }
});

//DELETE /salas/:id
SalasRouter.delete("/:id", async (req, res) => {
    try {
        await Sala.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = SalasRouter;
