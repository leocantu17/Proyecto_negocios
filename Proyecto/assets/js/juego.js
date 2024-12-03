// Creación del canvas
import InicioScene from './inicioScene.js';
import MenuScene from './menuScene.js';
//import JuegoScene from './juegoScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 520,
    parent: 'lienzo',
    scene: [InicioScene,MenuScene,/*JuegoScene,*/],
};

const game = new Phaser.Game(config);

/*Tamaños del lienzo
Entre 2
width: 400
height: 260

Entre 3
width: 266 Sobran 2
height: 173 Sobra 1

Entre 4
width: 200
height: 130
*/