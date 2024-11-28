class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
    }

    create() {
        this.add.text(400, 300, '¡Juego Iniciado!', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5);
      }
}

export default MenuScene;