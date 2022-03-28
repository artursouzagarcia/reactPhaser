import { autorun } from 'mobx';
import Phaser from 'phaser';
import StoreAmbienceSound from '../../store/StoreAmbienceSound';
import StoreToast from '../../store/StoreToast';
import coinSound2 from '../assets/soundfx/mixkit-retro-game-notification-212.wav';
const myAudio2 = new Audio(coinSound2);
const VOLUME = 0.1;
myAudio2.volume = VOLUME;
export default class Diamantes extends Phaser.GameObjects.Image {
    constructor(scene, x, y, player, bandeira, url) {
        super(scene, x, y, 'diamante');
        this.url = url || '';
        this.player = player;
        this.scene.add.existing(this);
        this.interactveAula = this.setInteractive();
        // this.collectcoinsaudioFX = this.scene.sound.add('coinsbag', { loop: false });
        this._init();
        this.scene.physics.world.enableBody(this, 0);
        this.bandeira = bandeira;
        this.isCollideable = false;
    }

    _init() {
        this.scale = 0.9;

        autorun(() => {
            const newVolume = StoreAmbienceSound.isPlaying ? VOLUME : 0;
            myAudio2.volume = newVolume;
        });
    }

    setColoder() {
        if (!this.isCollideable) {
            this.visible = true;
            this.isCollideable = true;
            this.scene.physics.add.overlap(this.player, this, this._collectCoins.bind(this));
        }
    }

    _collectCoins(player, sacodemoedas) {
        myAudio2.play();

        // contabiliza a diamante
        StoreToast.togggleToast(true, '♦ Parabens !!!', 'Você ganhou um diamante.');
        setTimeout(() => {
            StoreToast.togggleToast(false, '', '');
        }, 2000);
        this.bandeira.pegaDiamante();
        player.ganhaDiamantes(this.url);
        //TOCA O EFEITO SONORO
        // this.collectcoinsaudioFX.play();
        //SOME COM O "CORPO"
        this.destroy();
    }
}
