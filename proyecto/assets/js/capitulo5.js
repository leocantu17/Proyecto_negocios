class Capitulo5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Capitulo5' });
    }

    preload() {
        this.load.json('texts', '/assets/js/decisiones.json');
        this.load.image('titulo', '../img/titulos.png');
        this.load.image('taller', '../img/taller.png');
        this.load.image('cena', '../img/cena.png');
        this.load.image('parque', '../img/parque.png');
        this.load.image('apagado', '../img/apagado.png');
        this.load.image('encendido', '../img/encendido.png');
        this.load.image('flecha', '../img/flecha.png');
    }

    create() {
        // Titulo capítulo 1
        this.speechEnabled = true;
        this.add.image(0, 0, 'titulo').setOrigin(0);
        this.add.text(400, 240, 'Capítulo 5:', { font: 'italic 40px Arial', fill: 'black' }).setOrigin(0.5);
        this.add.text(400, 280, 'Final del camino', { font: 'italic 24px Arial', fill: 'black' }).setOrigin(0.5);

        // Configuración de los textos
        const texts = this.cache.json.get('texts').capitulo5;
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
                .on('pointerdown', () => this.toggleSpeech(texts[currentTextIndex]));

            // Botón para regresar al menú
            const regresarMenu = this.add.image(740, 50, 'flecha')
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    this.scene.start('MenuScene');
                    speechSynthesis.cancel();
                    this.speechEnabled = true;
                });

            // Agregar eventos de entrada
            this.input.keyboard.on('keydown-SPACE', handleInput, this);

            // Función que maneja la entrada
            function handleInput() {
                if (currentTextIndex < texts.length - 1) {
                    currentTextIndex++;

                    // Cambiar fondo según el índice
                    if (currentTextIndex >= 2 && currentTextIndex <= 14) {
                        background.setTexture('taller');

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
                    } else if (currentTextIndex >= 17 && currentTextIndex <= 23) {
                        background.setTexture('cena');

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
                    } else if (currentTextIndex >= 25 && currentTextIndex <= 30) {
                        background.setTexture('parque');

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

                    speechSynthesis.cancel(); // Detener lectura actual
                    setTimeout(() => this.leerEnVozAlta(texts[currentTextIndex]), 50);
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

                    speechSynthesis.cancel();

                    // Mostrar botón de regresar al menú
                    regresarMenu.setVisible(false);
                    silenciarButton.setVisible(false);
                }
            }
        });
    }

    leerEnVozAlta(texto) {
        speechSynthesis.cancel();
        if (this.speechEnabled) {
            this.speechSynthesisUtterance = new SpeechSynthesisUtterance(texto);
            this.speechSynthesisUtterance.lang = 'es-ES'; // Idioma español
            this.speechSynthesisUtterance.onend = () => { };
            speechSynthesis.speak(this.speechSynthesisUtterance);
        } else {
            speechSynthesis.cancel(); // Detener lectura actual
        }

        /*this.speechSynthesisUtterance = new SpeechSynthesisUtterance(texto);
        this.speechSynthesisUtterance.lang = 'es-ES'; // Idioma español
        this.speechSynthesisUtterance.onend = () => {};
        speechSynthesis.speak(this.speechSynthesisUtterance);*/
    }

    // Función para alternar la lectura en voz alta
    toggleSpeech(texto) {
        this.speechEnabled = !this.speechEnabled;

        // Cambiar el texto del botón de silenciar
        this.silenciarButton.setTexture(this.speechEnabled ? 'encendido' : 'apagado');

        // Detener la lectura si está activada
        if (!this.speechEnabled && speechSynthesis.speaking) {
            speechSynthesis.cancel(); // Detener cualquier lectura
        } else {
            // Si la voz está activada, leer el texto actual
            if (this.speechEnabled && this.speechSynthesisUtterance) {
                //speechSynthesis.speak(this.speechSynthesisUtterance); // Reanudar la lectura
                setTimeout(() => this.leerEnVozAlta(texto), 50);
            }
        }
    }
}


export default Capitulo5;