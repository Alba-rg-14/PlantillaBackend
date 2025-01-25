const express = require("express");
const imagenesRouter = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de multer para manejar múltiples archivos
const upload = multer({ dest: "uploads/" });

// Ruta para subir múltiples imágenes
imagenesRouter.post("/subir", upload.array("imagenes", 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ mensaje: "Debes proporcionar al menos una imagen" });
        }

        // Subir todas las imágenes a Cloudinary
        const resultados = await Promise.all(
            req.files.map((file) =>
                cloudinary.uploader.upload(file.path, {
                    folder: "entidades",
                    transformation: [
                        { quality: "auto", fetch_format: "auto" },
                        { width: 1200, height: 1200, crop: "fill", gravity: "auto" },
                    ],
                })
            )
        );

        // Eliminar los archivos temporales
        req.files.forEach((file) => fs.unlinkSync(file.path));

        // Devolver las URLs de las imágenes subidas
        res.status(200).json(resultados.map((resultado) => resultado.secure_url));
    } catch (error) {
        console.error("Error al subir imágenes:", error);
        res.status(500).json({ mensaje: "Error al subir imágenes", error: error.message });
    }
});

module.exports = imagenesRouter;
