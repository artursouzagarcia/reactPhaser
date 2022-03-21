import Phaser from 'phaser';
// import BootScene from './boot_scene';
import PreloaderScene from './preloader_scene';
// import TitleScene from './title_scene';
import UI from './ui';
import logo from '../assets/logo.png';

import ObsidadeScene from './ObsidadeScene';

export default class Controller extends Phaser.Scene {
    constructor() {
        super('Controller');
    }

    preload() {
        // this.load.image('logoMEDX', logo);
    }

    create() {
        // const bootScene = new BootScene();
        // this.scene.add('Boot', bootScene);
        this.scene.add('Preloader', PreloaderScene);
        // this.scene.add('Title', TitleScene);
        this.scene.add('ObsidadeScene', ObsidadeScene);
        this.scene.add('ui', UI);
        this.scene.start('Preloader');
    }
}
