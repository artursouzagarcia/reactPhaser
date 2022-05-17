import Phaser from 'phaser';
import scorePlayer from '../../store/scorePlayer';
import soundClick from '../assets/soundfx/mixkit-gate-latch-click-1924.wav';
import soundFootsteps from '../assets/soundfx/mixkit-crunchy-footsteps-loop-535.wav';
import StoreAmbienceSound from '../../store/StoreAmbienceSound';
// import PlayerInfos from './playerInfos';
import { autorun } from 'mobx';
const VOLUME = 0.1;
const myAudio2 = new Audio(soundClick);
myAudio2.volume = VOLUME;
export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprit) {
        super(scene, x, y, sprit);
        this.scene = scene;
        this.target = new Phaser.Math.Vector2();
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.lastpositionX = this.x;
        this.lastpositionY = this.y;
        this.qtdMoedas = 0;
        this.qtdDiamantes = 0;
        this.timeline = null;
        this.createAnimationSet();
    }

    createAnimationSet() {
        // new PlayerInfos(this.scene, this);
        // CRIA OS SETAS DE ANIMAÇÃO
        //CADA SET USA OS SPRITES QUE INFORMAR NOS FRAMES
        //PODE COLOCAR DURATION TB EM MS

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', { frames: [18] }),
            frameRate: 1,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [8, 7, 6, 5, 4, 3, 2, 1, 0],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [9, 10, 11, 12, 13, 14, 15, 16, 17],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'top',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [19, 20],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'bottom',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [21, 22],
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.play('idle');

        autorun(() => {
            const newVolume = StoreAmbienceSound.isPlaying ? VOLUME : 0;

            myAudio2.volume = newVolume;
        });
    }

    getPositionInTiles() {
        return { x: Math.floor(this.x / 32), y: Math.floor(this.y / 32) };
    }

    move(path, map, acaoDepoisDeAndar) {
        myAudio2.play();
        //FUNC QUE CRIA TIMELINE DE TWEENS QUE SÃO ALTERAÇÕES SEQUENCIAIS DE PROPS DE UM OBJETO
        // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
        if (this.timeline) {
            this.timeline.destroy();
        }
        // footstepsAudio.play();
        const tweensList = path.map(({ x: ex, y: ey }) => {
            this.target.x = ex * map.tileWidth;
            this.target.y = ey * map.tileHeight;
            return {
                targets: this,
                x: { value: ex * map.tileWidth, duration: window.location.origin.includes('localhost') ? 10 : 100 },
                y: { value: ey * map.tileHeight, duration: window.location.origin.includes('localhost') ? 10 : 100 },
                onComplete: (e) => {
                    // console.log(e);
                    const eixoX = e.data[0];
                    const eixoY = e.data[1];

                    if (eixoX.end != eixoX.start) {
                        // movimentando no eixo X
                        if (eixoX.end > eixoX.start) {
                            //direita
                            // console.log('right');
                            this.play('right', true);
                        } else {
                            //esquerda
                            // console.log('left');
                            this.play('left', true);
                        }
                    } else {
                        // movimentando no eixo Y
                        if (eixoY.end > eixoY.start) {
                            //baixo
                            // console.log('bottom');
                            this.play('bottom', true);
                        } else {
                            //cima
                            // console.log('bottom');
                            this.play('top', true);
                        }
                    }
                },
            };
        });

        this.timeline = this.scene.tweens.timeline({
            tweens: tweensList,
        });

        //FUNCAO DEFINIDA QUANDO A SEQUENCIA É ENCERRADA
        this.timeline.on('complete', (a, b) => {
            this.play('idle');
            if (acaoDepoisDeAndar)
                setTimeout(() => {
                    acaoDepoisDeAndar();
                    this.timeline = null;
                }, 400);
        });
    }

    ganhaMoeda() {
        this.qtdMoedas++;
        scorePlayer.increaseMoedas();
        console.log('O player agora tem ' + this.qtdMoedas + ' moedas.');
    }

    ganhaDiamantes(url) {
        this.qtdDiamantes++;
        scorePlayer.increaseDiamantes(url);

        console.log('O player agora tem ' + this.qtdDiamantes + ' diamantes.');
    }
}
