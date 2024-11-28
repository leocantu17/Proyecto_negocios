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