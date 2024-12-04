class Capitulo4 extends Phaser.Scene {
    constructor() {
        super({key: 'Capitulo4'});
    }

    preload() {
        this.load.json('texts', '/assets/js/decisiones.json');
    }

    create() {
        // Configuración del texto inicial
        const texts = this.cache.json.get('texts').capitulo4;
        let currentTextIndex = 0;

        console.log(this.cache.json.get('texts'));


        // Añadir texto principal
        const storyText = this.add.text(50, 370, texts[currentTextIndex], {
            font: '16px Arial',
            fill: '#ffffff',
            aling: 'justify',
            wordWrap: { width: 700 },
        }).setOrigin(0.0);

        // Manejo del teclado y el clic del mouse
        this.input.keyboard.on('keydown-SPACE', handleInput, this);
        this.input.on('pointerdown', handleInput, this);

        // Función que maneja ambos eventos
        function handleInput() {
            if (currentTextIndex < texts.length - 1) {
                currentTextIndex++;
                storyText.setText(texts[currentTextIndex]);
            } else {
                // Opcional: Mensaje final o transición
                storyText.setText("Has terminado este capítulo.");
            }
        }

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

export default Capitulo4;