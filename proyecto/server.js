const express=require('express');
const hbs=require('hbs');
const cors = require('cors');
const path=require('path');

const app=express();
app.use(cors());

const port=process.env.PORT || 3000

//Configuración de las vistas
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'./views'));
hbs.registerPartials(path.join(__dirname, `./views`));
hbs.registerPartials(path.join(__dirname, `./views/partials`));

//Server estatico desde assets
app.use(express.static(path.join(__dirname,'./assets')));

//Middleware para el JSON
app.use(express.json());

//Importar rutas
app.use(require('./routes/rt_index'))

// Ruta para servir "decisiones.json"
app.get('/assets/js/decisiones.json', (req, res) => {
    res.sendFile(path.join(__dirname, './assets/js/decisiones.json'));
});

app.listen(port,()=>{
    console.log(`Link del servidor http://localhost:${port}`)
})