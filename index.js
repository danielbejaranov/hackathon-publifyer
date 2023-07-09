const express = require('express');
const multer = require('multer');
const fs = require('fs')
const { promisify } = require('util');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const upload = multer({ dest: 'src/uploads/' });
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readFile = promisify(fs.readFile);
const unlinkFile = promisify(fs.unlink);

app.post('/upload', upload.single('video'), async (req, res) => {
    const { id } = req.body;
    const videoPath = req.file.path;
    const width = 1080;
    const height = 1920;
    if (id == 'opcion1') { //redimensionar
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const vr= await redimensionarVideo(videoPath,outPutFilePath,width,height);
        await realizarClip(vr,clipOutPutFilePath);
    } else if (id == 'opcion2' ) {//calidad de video
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const cv= await calidadVideo(videoPath,outPutFilePath);
        await realizarClip(cv,clipOutPutFilePath);

    } else if (id = 'opcion3') {//mejorar audio
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const ma=await procesamientoVideo(videoPath,outPutFilePath,outTikTokFilePath,width,height);
        await realizarClip(ma,clipOutPutFilePath);

    }
    else if (id == 'opcion1'&& id == 'opcion2') { //redimensionar y calidad de video
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const vr= await redimensionarVideo(videoPath,outPutFilePath,width,height);
        const cv= await calidadVideo(vr,outPutFilePath);
        await realizarClip(cv,clipOutPutFilePath);

    } else if (id == 'opcion1' && id== 'opcion3' ) {//redimencionar y mejorar audio
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const vr= await redimensionarVideo(videoPath,outPutFilePath,width,height);
        const ma= await reducirRuidoVideo(vr,outPutFilePath);

        await realizarClip(ma,clipOutPutFilePath);
    } else if (id = 'opcion2' && id=='opcion3') {//calidad de video y mejorar audio
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const cv= await calidadVideo(videoPath,outPutFilePath);
        const ma= await reducirRuidoVideo(cv,outPutFilePath);
        await realizarClip(ma,clipOutPutFilePath);

    }else if (id=='opcion1'&& id=='opcion2'&& id=='opcion3'){//redimensionar,calidad de video y mejorar audio
        const outPutFilePath = __dirname+`/downloads/reels${Date.now()}.mp4`;
        const clipOutPutFilePath = __dirname+`/downloads/history${Date.now()}.mp4`;
        const vr= await redimensionarVideo(videoPath,outPutFilePath,width,height);
        const cv= await calidadVideo(vr,outPutFilePath);
        const ma= await reducirRuidoVideo(cv,outPutFilePath);
        await realizarClip(ma,clipOutPutFilePath);

    }else {
        console.log('seleccione una opcion')
    }
});

async function redimensionarVideo(rutaIn, rutaOut, width, height) {
    await new Promise(() => {
        ffmpeg(rutaIn)
            .size(`${width}x${height}`)
            
            .output(rutaOut)
            .on('end', () => {
                console.log('Redimensionamiento completado');
            })
            .on('error', (err) => {
                console.error('Error al redimensionar el video:', err);
            })
            .run();
    });
}
async function calidadVideo(rutaIn, rutaOut) {
    await new Promise(() => {
        ffmpeg(rutaIn)
            .videoBitrate('8000k')
            .output(rutaOut)
            .on('end', () => {
                console.log('Calidad del video mejorada');
            })
            .on('error', (err) => {
                console.error('Error al mejorar la calidad del video:', err);
            })
            .run();
    });
}

async function reducirRuidoVideo(rutaIn, rutaOut) {
    await new Promise(() => {
        ffmpeg(rutaIn)
            .audioFilter('afade=tn=0.3:st=0:d=5')//'noise=alls=20:allf=t+u')
            .output(rutaOut)
            .on('end', () => {
                console.log('Eliminación de ruido completada');
            })
            .on('error', (err) => {
                console.error('Error al eliminar el ruido del video:', err);
            })
            .run();
    });
}

async function realizarClip(rutaIn,rutaOut){
    await new Promise((resolve, reject) => {
        ffmpeg(outPutFilePath)
          .setStartTime(3)
          .setDuration(5)
          .output(clipOutPutFilePath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
      
      console.log('Clip extraído exitosamente.');
}

/*async function procesamientoVideo(videoPathF, rutaInF, rutaPublicar, widthF, heightF){
    try {
        await redimensionarVideo(videoPathF, rutaInF, widthF, heightF);

        //reducir ruido audio clip
        await reducirRuidoVideo(rutaInF, rutaPublicar);
        await unlinkFile(videoPathF);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error al procesar o publicar el video.' })
    }
}*/

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
})


