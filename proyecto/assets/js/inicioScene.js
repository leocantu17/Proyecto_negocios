class InicioScene extends Phaser.Scene {
    constructor() {
        super({key: 'InicioScene'});
    }

    preload() {
        this.load.image('fondo', '../img/fondo.png');
        this.load.image('boton', '../img/boton.jpeg');
    }

    create() {
        //Fondo del juego
        this.add.image(400, 300, 'fondo').setOrigin(0);
        //Texto del título
        this.add.text(400, 150, 'Mi juego', {font: '40px Arial', fill: '#ffffff'}).setOrigin(0.5);
        //Botón para iniciar el juego
        const boton = this.add.image(400, 300, 'boton').setInteractive();
        //Acción al hacer clic en el botón
        boton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
        //Texto en el botón
        this.add.text(400, 450, 'Iniciar', {font: '20px Arial', fill: '#ffffff'}).setOrigin(0.5);
    }
}

export default InicioScene;