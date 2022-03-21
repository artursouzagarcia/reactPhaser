import Phaser from 'phaser';
import logo from '../assets/logo.png';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        debugger;
        this.load.image('logoMEDX', logo);
    }

    ready() {
        debugger;
        this.scene.start('Preloader');
    }
}
