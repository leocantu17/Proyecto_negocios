// Creación del canvas
import InicioScene from './inicioScene.js';
import MenuScene from './menuScene.js';
import Capitulo1 from './capitulo1.js';
/*import Capitulo2 from './capitulo2.js';
import Capitulo3 from './capitulo3.js';
import Capitulo4 from './capitulo4.js';
import Capitulo5 from './capitulo5.js';*/

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 520,
    parent: 'lienzo',
    scene: [InicioScene,MenuScene,Capitulo1/*,Capitulo2,Capitulo3,Capitulo4,Capitulo5*/],
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