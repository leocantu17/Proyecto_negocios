const express=require('express');
const hbs=require('hbs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const path=require('path');


const app=express();
app.use(cors());


const port=process.env.PORT || 3000

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'./views'));
hbs.registerPartials(path.join(__dirname, `./views`));
hbs.registerPartials(path.join(__dirname, `./views/partials`));

app.use(express.static(path.join(__dirname,'./assets')));

app.use(require('./routes/rt_index'))

// Reemplaza 'TU_API_KEY' con tu clave de Google AI Studio
const genAI = new GoogleGenerativeAI('AIzaSyCc1FU9XUvYRWxWLv8a1ef_cwXc6PE9zXU');

app.post('/consulta', async (req, res) => {
    try {
        const { consulta } = req.body;

        // Modelo generativo
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        // Generar respuesta
        const result = await model.generateContent(consulta);
        const response = await result.response;
        const text = response.text();

        res.json({
            respuesta: text
        });

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ 
            error: 'No se pudo procesar la consulta', 
            detalle: error.message 
        });
    }
});

app.listen(port,()=>{
    console.log(`Link del servidor http://localhost:${port}`)
})