//Conexión a los controladores de vistas (views)
const express = require('express');
const router = express.Router()

module.exports = router;

router.get('/',(req,res)=>{
    res.render('lobby')
})

router.get('/capitulos',(req,res)=>{
    res.render('capitulos')
})

router.get('/juego',(req,res)=>{
    res.render('juego')
})

router.get('/informacion',(req,res)=>{
    res.render('informacion')
})