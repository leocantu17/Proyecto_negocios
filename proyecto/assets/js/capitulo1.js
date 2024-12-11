class Capitulo1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Capitulo1' });
        this.speechEnabled = true;
        this.SpeechSynthesisUtterance = null;
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
            let storyText = this.add.text(400, 260, texts[currentTextIndex], {
                font: 'italic 20px Arial',
                fill: 'black',
                align: 'center',
                wordWrap: { width: 700 },
            }).setOrigin(0.5);

            this.leerEnVozAlta(texts[currentTextIndex]);

            // Botón para silenciar la voz
            this.silenciarButton = this.add.text(700, 500, 'Silenciar voz', {
                font: 'italic 20px Arial',
                fill: '#ffffff',
                backgroundColor: '#ff0000',
            })
                .setOrigin(0.5)
                .setInteractive();

            this.silenciarButton.on('pointerdown', () => {
                this.toggleSpeech(); // Alterna el estado de lectura en voz alta
            });

            // Agregar eventos de entrada
            this.input.keyboard.on('keydown-SPACE', handleInput, this);

            // Función que maneja la entrada
            function handleInput() {
                if (currentTextIndex < texts.length - 1) {
                    currentTextIndex++;

                    // Cambiar fondo según el índice
                    if (currentTextIndex > 3 && currentTextIndex < 9) {
                        background.setTexture('patio');

                        storyText.setStyle({
                            font: '16px Arial',
                            fill: 'black',
                            align: 'justify',
                            wordWrap: { width: 700 },
                        });
                        storyText.setOrigin(0);
                        storyText.setPosition(50, 340);
                    } else {
                        background.setTexture('titulo');

                        storyText.setStyle({
                            font: 'italic 20px Arial',
                            fill: 'black',
                            align: 'center',
                        });
                        storyText.setOrigin(0.5);
                        storyText.setPosition(400, 240);
                    }

                    // Actualizar texto
                    storyText.setText(texts[currentTextIndex]);

                    // Leer texto en voz alta automáticamente
                    if (this.speechEnabled) {
                        this.leerEnVozAlta(texts[currentTextIndex]);
                    }
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
        this.silenciarButton.setText(this.speechEnabled ? 'Silenciar voz' : 'Activar voz');
    
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

export default Capitulo1;