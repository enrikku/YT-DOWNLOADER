const express = require('express');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const DOWNLOAD_DIR = path.join(__dirname, 'downloads');

// Asegurar que la carpeta de descargas existe
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get('/downloadmp4/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        console.log(`🔥 Descargando video: ${videoUrl}`);

        // Obtener información del video (sin descargar)
        const result = await youtubedl(videoUrl, { dumpSingleJson: true });

        // Nombre de archivo seguro (sin caracteres especiales)
        const safeTitle = result.title.replace(/[<>:"/\\|?*]+/g, "");
        const outputFilePath = path.join(DOWNLOAD_DIR, `${safeTitle}.mp4`);

        // Descargar video con audio en MP4
        await youtubedl(videoUrl, {
            format: 'bestvideo+bestaudio',
            output: outputFilePath,
            mergeOutputFormat: 'mp4'
        });

        // Verificar que el archivo existe antes de enviarlo
        if (!fs.existsSync(outputFilePath)) {
            console.error("❌ Archivo no encontrado después de la descarga:", outputFilePath);
            return res.status(500).send("Error: No se pudo descargar el video.");
        }

        // Enviar el archivo al cliente
        res.download(outputFilePath, `${safeTitle}.mp4`, (err) => {
            if (err) {
                console.error("❌ Error al enviar el archivo:", err);
                res.status(500).send("Error al enviar el archivo.");
            } else {
                console.log(`✅ Video descargado y enviado: ${outputFilePath}`);
                res.status(200).send("Video descargado y enviado.");
            }
        });

    } catch (error) {
        console.error("❌ Error al descargar el video:", error);
        res.status(500).send("Error al descargar el video.");
    }
});

app.get('/downloadmp3/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        console.log(`🔥 Descargando audio: ${videoUrl}`);

        // Obtener información del video (sin descargar)
        const result = await youtubedl(videoUrl, { dumpSingleJson: true });

        // Nombre de archivo seguro (sin caracteres especiales)
        const safeTitle = result.title.replace(/[<>:"/\\|?*]+/g, "");
        const outputFilePath = path.join(DOWNLOAD_DIR, `${safeTitle}.mp3`);

        // Descargar y convertir a MP3 con FFmpegExtractAudio
        await youtubedl(videoUrl, {
            format: 'bestaudio', // Descargar solo el audio
            output: outputFilePath,
            extractAudio: true, // 🔹 Activa la extracción de audio
            audioFormat: 'mp3', // 🔹 Convertir a MP3
            audioQuality: '192K', // 🔹 Calidad del audio
        });

        // Verificar que el archivo existe antes de enviarlo
        if (!fs.existsSync(outputFilePath)) {
            console.error("❌ Archivo no encontrado después de la descarga:", outputFilePath);
            return res.status(500).send("Error: No se pudo descargar el audio.");
        }

        // Enviar el archivo al cliente
        res.download(outputFilePath, `${safeTitle}.mp3`, (err) => {
            if (err) {
                console.error("❌ Error al enviar el archivo:", err);
                res.status(500).send("Error al enviar el archivo.");
            } else {
                console.log(`✅ Audio descargado y enviado: ${outputFilePath}`);
                res.status(200).send("Audio descargado y enviado.");
            }
        });

    } catch (error) {
        console.error("❌ Error al descargar el audio:", error);
        res.status(500).send("Error al descargar el audio.");
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
