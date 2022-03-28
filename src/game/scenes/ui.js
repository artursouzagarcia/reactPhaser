import Phaser from 'phaser';

export default class UI extends Phaser.Scene {
    constructor(scene, teste) {
        super(scene);
        this.scene = scene;
        this.minimap = null;
    }

    create() {
        console.log('aq ui', this.scene);
        this.minimap = this.cameras
            .add(20, 10, window.innerWidth / 3, window.innerHeight / 3)
            .setZoom(0.1)
            .setName('mini');
        this.minimap.alpha = 0.9;
    }
}
