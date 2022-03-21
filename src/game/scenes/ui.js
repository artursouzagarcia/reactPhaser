import Phaser from 'phaser';

export default class UI extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        this.scoreLevelDom = null;
    }

    create() {
        this.scoreLevelDom = this.add.dom(215, 10, '#score');

        this.scoreLevelDom.node.style.width = '400px';
        this.scoreLevelDom.updateSize();
    }
}
