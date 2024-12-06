class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
    }

    preload() {
        this.load.image('fondoMenu', '../img/menuFondo.png');
        this.load.image('capitulo', '../img/pruCap240.png');
    }

    create() {
        //Fondo del juego
        this.add.image(0, 0, 'fondoMenu').setOrigin(0);

        //Texto del título
        this.add.text(400,60, 'Selecciona un capitulo', {
            font: 'italic 40px Arial',
            fill: 'black'
        }).setOrigin(0.5);

        //Botones para los capitulos
        const capitulos = [
            {name: 'Capítulo 1:', subName: 'Inicio', scene: 'Capitulo1', coor: {x: 134, y: 220}},
            {name: 'Capítulo 2:', subName: 'Desafios', scene: 'Capitulo2', coor: {x: 400, y: 220}},
            {name: 'Capítulo 3:', subName: 'Consecuencias', scene: 'Capitulo3', coor: {x: 666, y: 220}},
            {name: 'Capítulo 4:', subName: 'Enfrentamiento', scene: 'Capitulo4', coor: {x: 265, y: 420}},
            {name: 'Capítulo 5:', subName: 'Resolución', scene: 'Capitulo5', coor: {x: 535, y: 420}}
        ];
        
        //Creación de los botones para los capitulos
        capitulos.forEach((capitulo, index) => {
            const boton = this.add.image(capitulo.coor.x, capitulo.coor.y, 'capitulo')
                .setInteractive()
                .setScale(0.5);

            //Agregar texto encima del botón
            this.add.text(capitulo.coor.x, capitulo.coor.y - 110, capitulo.name, {
                font: 'italic 24px Arial',
                fill: 'black'
            }).setOrigin(0.5);
            this.add.text(capitulo.coor.x, capitulo.coor.y - 85, capitulo.subName, {
                font: 'italic 20px Arial',
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