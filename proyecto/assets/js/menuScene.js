class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
    }

    preload() {
        this.load.image('fondo', '../img/inicioFondo.png');
        this.load.image('capitulo', '../img/pruebacapitulos.png');
    }

    create() {
        //Fondo del juego
        this.add.image(0, 0, 'fondo').setOrigin(0);

        //Texto del título
        this.add.text(400,100, 'Selecciona un capitulo', {
            font: 'italic 40px Arial',
            fill: 'black'
        }).setOrigin(0.5);

        //Botones para los capitulos
        const capitulos = [
            {name: 'Capítulo 1', scene: 'Capitulo1'},
            {name: 'Capítulo 2', scene: 'Capitulo2'},
            {name: 'Capítulo 3', scene: 'Capitulo3'},
            {name: 'Capítulo 4', scene: 'Capitulo4'},
            {name: 'Capítulo 5', scene: 'Capitulo5'}
        ];
        
        //Creación de los botones para los capitulos
        capitulos.forEach((capitulo, index) => {
            const boton = this.add.image(400, 150 + index * 70, 'capitulo')
                .setInteractive()
                .setScale(0.5);

            //Agregar texto encima del botón
            this.add.text(400, 150 + index * 70, capitulo.name, {
                font: 'italic 40px Arial',
                fill: 'black'
            }).setOrigin(0.5);

            //Acción al hacer clic en el botón
            boton.on('pointerdown', () => {
                this.scene.start(capitulo.scene);
            });

            //Aparecia al pasar el mouse por encima del botón
            boton.on('pointerover', () => boton.setScale(0.55));
            boton.on('pointerout', () => boton.setScale(0.5));
        });
    }
}

export default MenuScene;