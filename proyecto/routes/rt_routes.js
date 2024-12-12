//Petición a los controladores de base de datos (rt)
const { Router } = require ( 'express' );
const router = Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyCBd9WWlSkq420LI9h0QbI4tqodryOEyLg');

//Ruta para realizar la conxion con IA
router.post('/consulta', async (req, res) => {
    try {
        const { consulta } = req.body;

        // Modelo generativo
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        //Contexto a la consulta
        const consultaConContexto = `Responde en español: ${consulta}`;

        // Generar respuesta
        const result = await model.generateContent(consultaConContexto);
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

//ruta para el JSON

module.exports = router