class InicioScene extends Phaser.Scene {
    constructor() {
        super({key: 'InicioScene'});
    }

    preload() {
        this.load.image('fondoInicio', '../img/inicioFondo.png');
        this.load.image('botonComienzo', '../img/boton.png');
    }

    create() {
        //Fondo del juego
        this.add.image(0, 0, 'fondoInicio').setOrigin(0);
        //Texto del título
        this.add.text(400, 150, 'Cuidar y Sanar', {font: 'italic 40px Arial', fill: 'black'}).setOrigin(0.5);
        //Botón para iniciar el juego
        const boton = this.add.image(400, 300, 'botonComienzo').setInteractive();
        //Acción al hacer clic en el botón
        boton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

export default InicioScene;