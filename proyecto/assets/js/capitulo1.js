class Capitulo1 extends Phaser.Scene {
    constructor() {
        super({key: 'Capitulo1'});
    }

    create() {
        this.add.text(0, 0, 'Bienvenido al Capítulo 1', {
            font: 'italic 40px Arial',
            fill: '#ffffff'
        }).setOrigin(0.0);

        //Botón para regresar al menú
        const regresarMenu = this.add.text(400, 450, 'Volver al menú' , {
            font: 'italic 40px Arial',
            fill: '#ffffff',
            backgroundColor: '#000'
        }).setOrigin(0.0).setInteractive()
        
        regresarMenu.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

export default Capitulo1;