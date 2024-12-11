class Capitulo1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Capitulo1' });
    }

    preload() {
        this.load.json('texts', '/assets/js/decisiones.json');
        this.load.image('titulo', '../img/titulos.png');
        this.load.image('patio', '../img/patio.png');
        this.load.image('cafeteria', '../img/cafeteria.png');
    }

    create() {
        // Titulo capítulo 1
        this.add.image(0, 0, 'titulo').setOrigin(0);
        this.add.text(400, 240, 'Capítulo 1:', { font: 'italic 40px Arial', fill: 'black' }).setOrigin(0.5);
        this.add.text(400, 280, 'Primeras señales', { font: 'italic 24px Arial', fill: 'black' }).setOrigin(0.5);

        // Configuración de los textos
        const texts = this.cache.json.get('texts').capitulo1;
        let currentTextIndex = 0;

        // Cambiar de fondo después de 2 segundos
        this.time.delayedCall(2000, () => {
            // Fondo y texto iniciales
            let background = this.add.image(0, 0, 'titulo').setOrigin(0);
            let storyText = this.add.text(50, 370, texts[currentTextIndex], {
                font: '16px Arial',
                fill: 'black',
                align: 'justify',
                wordWrap: { width: 700 },
            }).setOrigin(0.0);

            // Agregar eventos de entrada
            this.input.keyboard.on('keydown-SPACE', handleInput, this);
            this.input.on('pointerdown', handleInput, this);

            // Función que maneja la entrada
            function handleInput() {
                if (currentTextIndex < texts.length - 1) {
                    currentTextIndex++;

                    // Cambiar fondo según el índice
                    if (currentTextIndex > 3 && currentTextIndex < 9) {
                        background.setTexture('patio');
                    } else {
                        background.setTexture('titulo');
                    }

                    // Actualizar texto
                    storyText.setText(texts[currentTextIndex]);
                } else {
                    // Opcional: Mensaje final o transición
                    storyText.setText("Has terminado este capítulo.");
                }
            }

        });

        // Botón para regresar al menú
        const regresarMenu = this.add.text(700, 30, 'Volver al menú', {
            font: 'italic 24px Arial',
            fill: '#ffffff',
            backgroundColor: '#000'
        })
            .setOrigin(0.5)
            .setInteractive();

        regresarMenu.on('pointerdown', () => {
            this.scene.start('MenuScene'); // Cambiar a la escena del menú
        });
    }
}

export default Capitulo1;