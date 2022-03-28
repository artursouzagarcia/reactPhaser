import Phaser from 'phaser';
import StoreToast from '../../store/StoreToast';
import storeAmbienceSound from '../../store/StoreAmbienceSound';
import coinSound from '../assets/soundfx/gold_sack.wav';
import coinSound2 from '../assets/soundfx/mixkit-retro-game-notification-212.wav';
import { autorun } from 'mobx';
const VOLUME = 0.1;
const myAudio = new Audio(coinSound);
const myAudio2 = new Audio(coinSound2);
myAudio.volume = VOLUME;
myAudio2.volume = VOLUME;
export default class SacoMoedas extends Phaser.GameObjects.Image {
    constructor(scene, x, y, playerSetPostion, player, bandeira) {
        super(scene, x, y, 'sacodemoedas');

        this.player = player;
        this.playerSetPostion = playerSetPostion;
        this.scene.add.existing(this);
        this.interactveAula = this.setInteractive();
        // this.collectcoinsaudioFX = this.scene.sound.add('coinsbag', { loop: false });
        this._initClickOn();
        this.scene.physics.world.enableBody(this, 0);
        this.bandeira = bandeira;
    }

    _initClickOn() {
        this.scale = 1.2;
        this.interactveAula.on('pointerup', () => {
            //CLICANDO NO OBJETO MANDO ELE PARA LÁ NAS COORDANADAS ESPECIFICAS
            //A BIBLIOTECA STAR CALCULA O TRAJETO EM TILES, POR ISSO AS COORDENADAS SÃO DIVIDAS PELO TILESIZE
            const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
            this.scene.findPathAndMove(PlayerX, PlayerY, this.playerSetPostion.x / 32, this.playerSetPostion.y / 32);
        });

        this.scene.physics.add.overlap(this.player, this, this._collectCoins.bind(this));

        autorun(() => {
            const newVolume = storeAmbienceSound.isPlaying ? VOLUME : 0;
            myAudio.volume = newVolume;
            myAudio2.volume = newVolume;
        });
        // this.scene.sound.add('coinsbag', { loop: false });
    }

    _collectCoins(player, sacodemoedas) {
        myAudio2.play();
        myAudio.play();
        StoreToast.togggleToast(true, '💰 Parabens !!!', 'Você ganhou um saco de moedas.');
        setTimeout(() => {
            StoreToast.togggleToast(false, '', '');
        }, 2000);
        this.bandeira.pegaMoeda();
        player.ganhaMoeda();
        //TOCA O EFEITO SONORO
        // this.collectcoinsaudioFX.play();
        //SOME COM O "CORPO"
        this.destroy();
    }
}
