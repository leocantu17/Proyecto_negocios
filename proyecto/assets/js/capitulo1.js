class Capitulo1 extends Phaser.Scene {
    constructor() {
        super({key: 'Capitulo1'});
    }

    preload() {
        this.load.json('texts', '/assets/js/decisiones.json');
    }

    create() {
        // Configuración del texto inicial
        const texts = this.cache.json.get('texts').capitulo1;
        let currentTextIndex = 0;

        console.log(this.cache.json.get('texts'));


        // Añadir texto principal
        const storyText = this.add.text(400, 200, texts[currentTextIndex], {
            font: '24px Arial',
            fill: '#ffffff',
            wordWrap: { width: 700 },
            align: 'center'
        }).setOrigin(0.5);

        // Detectar la barra espaciadora
        this.input.keyboard.on('keydown-SPACE', () => {
            // Cambiar el texto si hay más disponible
            if (currentTextIndex < texts.length - 1) {
                currentTextIndex++;
                storyText.setText(texts[currentTextIndex]);
            } else {
                // Opcional: Mensaje final o transición
                storyText.setText("Has terminado este capítulo.");
            }
        });

        // Botón para regresar al menú
        const regresarMenu = this.add.text(400, 450, 'Volver al menú', {
            font: 'italic 30px Arial',
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