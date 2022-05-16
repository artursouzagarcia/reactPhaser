import Phaser from 'phaser';

export default class PlayerInfos extends Phaser.GameObjects.GameObject {
    constructor(scene, player) {
        super(scene);
        this.scene = scene;
        this.player = player;
        this.graphics = null;
        this.init();
    }

    init() {
        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0xffffff);
        this.graphics.fillRect(0, 0, 25, 4);
    }

    update() {
        this.graphics.x = this.player.lastpositionX;
        this.graphics.y = this.player.lastpositionY;
    }
}
