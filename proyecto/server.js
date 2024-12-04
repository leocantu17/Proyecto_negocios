const express=require('express');
const hbs=require('hbs');
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
app.use(express.json());
app.use(require('./routes/rt_index'))

app.listen(port,()=>{
    console.log(`Link del servidor http://localhost:${port}`)
})