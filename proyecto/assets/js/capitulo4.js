class Capitulo4 extends Phaser.Scene {
    constructor() {
        super({key: 'Capitulo4'});
    }

    preload() {
        this.load.json('texts', '/assets/js/decisiones.json');
        this.load.image('titulo', '../img/titulos.png');
        this.load.image('terapia', '../img/terapia.png');
        this.load.image('restaurante', '../img/restaurante.png');
        this.load.image('habitacion', '../img/habitacion.png');
        this.load.image('patio', '../img/patio.png');
        this.load.image('apagado', '../img/apagado.png');
        this.load.image('encendido', '../img/encendido.png');
        this.load.image('flecha', '../img/flecha.png');
    }

    create() {
        // Titulo capítulo 1
        this.add.image(0, 0, 'titulo').setOrigin(0);
        this.add.text(400, 240, 'Capítulo 4:', { font: 'italic 40px Arial', fill: 'black' }).setOrigin(0.5);
        this.add.text(400, 280, 'Recuperación', { font: 'italic 24px Arial', fill: 'black' }).setOrigin(0.5);

        // Configuración de los textos
        const texts = this.cache.json.get('texts').capitulo4;
        let currentTextIndex = 0;

        // Cambiar de fondo después de 2 segundos
        this.time.delayedCall(2000, () => {
            // Fondo y texto iniciales
            let background = this.add.image(0, 0, 'titulo').setOrigin(0);
            let storyText = this.add.text(400, 260, texts[currentTextIndex], {
                font: 'italic 20px Arial',
                fill: 'black',
                align: 'center',
                wordWrap: { width: 700 },
            }).setOrigin(0.5);

            this.leerEnVozAlta(texts[currentTextIndex]);

            // Botón para silenciar la voz
            this.silenciarButton = this.add.image(740, 470, 'encendido')
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.toggleSpeech());

            // Botón para regresar al menú
            const regresarMenu = this.add.image(740, 50, 'flecha')
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.scene.start('MenuScene'));

            // Agregar eventos de entrada
            this.input.keyboard.on('keydown-SPACE', handleInput, this);

            // Función que maneja la entrada
            function handleInput() {
                if (currentTextIndex < texts.length - 1) {
                    currentTextIndex++;

                    // Cambiar fondo según el índice
                    if (currentTextIndex >= 1 && currentTextIndex <= 7 || currentTextIndex >= 15 && currentTextIndex <= 19 || currentTextIndex >= 31 && currentTextIndex <= 35) {
                        background.setTexture('terapia');

                        storyText.setStyle({
                            font: '16px Arial',
                            fill: 'black',
                            align: 'justify',
                            wordWrap: { width: 700 },
                        });
                        storyText.setOrigin(0);
                        storyText.setPosition(50, 340);

                        // Mostrar botón de regresar al menú
                        regresarMenu.setVisible(true);
                    } else if (currentTextIndex >= 9 && currentTextIndex <= 14) {
                        background.setTexture('restaurante');

                        storyText.setStyle({
                            font: '16px Arial',
                            fill: 'black',
                            align: 'justify',
                            wordWrap: { width: 700 },
                        });
                        storyText.setOrigin(0);
                        storyText.setPosition(50, 340);

                        // Mostrar botón de regresar al menú
                        regresarMenu.setVisible(true);
                    } else if (currentTextIndex >= 22 && currentTextIndex <= 28) {
                        background.setTexture('patio');

                        storyText.setStyle({
                            font: '16px Arial',
                            fill: 'black',
                            align: 'justify',
                            wordWrap: { width: 700 },
                        });
                        storyText.setOrigin(0);
                        storyText.setPosition(50, 340);

                        // Mostrar botón de regresar al menú
                        regresarMenu.setVisible(true);
                    } else if (currentTextIndex >= 29 && currentTextIndex <= 30) {
                        background.setTexture('habitacion');

                        storyText.setStyle({
                            font: '16px Arial',
                            fill: 'black',
                            align: 'justify',
                            wordWrap: { width: 700 },
                        });
                        storyText.setOrigin(0);
                        storyText.setPosition(50, 340);

                        // Mostrar botón de regresar al menú
                        regresarMenu.setVisible(true);
                    } else {
                        background.setTexture('titulo');

                        storyText.setStyle({
                            font: 'italic 20px Arial',
                            fill: 'black',
                            align: 'center',
                        });
                        storyText.setOrigin(0.5);
                        storyText.setPosition(400, 240);

                        // Mostrar botón de regresar al menú
                        regresarMenu.setVisible(true);
                    }

                    // Actualizar texto
                    storyText.setText(texts[currentTextIndex]);

                    // Leer texto en voz alta automáticamente
                    if (this.speechEnabled) {
                        this.leerEnVozAlta(texts[currentTextIndex]);
                    }
                } else {
                    background.setTexture('titulo');
                    storyText.setText("Presiona para regresar al menú.")
                        .setStyle({
                            font: 'italic 20px Arial',
                            fill: 'black',
                            align: 'center',
                        })
                        .setOrigin(0.5)
                        .setPosition(400, 240)
                        .setInteractive()
                        .on('pointerdown', () => this.scene.start('MenuScene'));

                    // Mostrar botón de regresar al menú
                    regresarMenu.setVisible(false);
                }
            }
        });
    }

    leerEnVozAlta(texto) {
        if (this.speechSynthesisUtterance) {
            speechSynthesis.cancel(); // Detener cualquier lectura anterior
        }

        this.speechSynthesisUtterance = new SpeechSynthesisUtterance(texto);
        this.speechSynthesisUtterance.lang = 'es-ES';  // Idioma español
        speechSynthesis.speak(this.speechSynthesisUtterance);
    }

    // Función para alternar la lectura en voz alta
    toggleSpeech() {
        this.speechEnabled = !this.speechEnabled;

        // Cambiar el texto del botón de silenciar
        this.silenciarButton.setTexture(this.speechEnabled ? 'encendido' : 'apagado');

        // Detener la lectura si está activada
        if (!this.speechEnabled && speechSynthesis.speaking) {
            speechSynthesis.cancel(); // Detener cualquier lectura
        } else {
            // Si la voz está activada, leer el texto actual
            if (this.speechEnabled && this.speechSynthesisUtterance) {
                speechSynthesis.speak(this.speechSynthesisUtterance); // Reanudar la lectura
            }
        }
    }
}

export default Capitulo4;