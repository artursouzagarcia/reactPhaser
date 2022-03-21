import Phaser from 'phaser';
import config from '../config/config';
import Button from '../objects/buttons';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        const scoreText = this.add.text(150, config.height / 2, `Pronto para começar sua jornada?!`, {
            fontSize: '25px',
            fill: '#fff',
        });
        this.add.image(400, 80, 'logoMEDX');

        this.gameButton = new Button(
            this,
            config.width / 2,
            config.height / 2 - 100,
            'start_button',
            'start_button_click',
            'ObsidadeScene',
        );
    }
}
