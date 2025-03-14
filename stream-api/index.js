const express = require('express');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get('/streammp4/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        console.log(`🔥 Transmitiendo video: ${videoUrl}`);

        res.setHeader('Content-Type', 'video/mp4');

        // Get video info
        const videoInfo = await youtubedl(videoUrl, { dumpSingleJson: true });
        // Set file name
        if (!videoInfo) {
            res.setHeader('Content-Disposition', `attachment; filename="${videoId}.mp4"`);
            throw new Error("No se pudo obtener el título del video.");
        }else{
            res.setHeader('Content-Disposition', `attachment; filename="${videoInfo.title}.mp4"`);
            console.log(videoInfo.title)
        }

        const stream = youtubedl.exec(videoUrl, {
            format: 'bestvideo+bestaudio',
            output: '-',
            mergeOutputFormat: 'mp4'
        }, { stdio: ['ignore', 'pipe', 'ignore'] });

        stream.stdout.pipe(res);
        
    } catch (error) {
        console.error("❌ Error al transmitir el video:", error);
        res.status(500).send("Error al transmitir el video.");
    }
});

app.get('/downloadmp3/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        console.log(`🔥 Transmitiendo y permitiendo descarga de audio: ${videoUrl}`);

        // Set content type
        res.setHeader('Content-Type', 'audio/mpeg');
        
        // Get video info
        const videoInfo = await youtubedl(videoUrl, { dumpSingleJson: true });
        
        // Set file name
        if (!videoInfo) {
            res.setHeader('Content-Disposition', `attachment; filename="${videoId}.mp3"`);
            throw new Error("No se pudo obtener el título del video.");
        }else{
            res.setHeader('Content-Disposition', `attachment; filename="${videoInfo.title}.mp3"`);
            console.log(videoInfo.title)
        }

        // Enviar el audio
        const stream = youtubedl.exec(videoUrl, {
            format: 'bestaudio',
            output: '-',
            extractAudio: true,
            audioFormat: 'mp3',
            audioQuality: '192K'
        }, { stdio: ['ignore', 'pipe', 'ignore'] });

        
        stream.stdout.pipe(res);
        
    } catch (error) {
        console.error("❌ Error al transmitir el audio:", error);
        res.status(500).send("Error al transmitir el audio.");
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
