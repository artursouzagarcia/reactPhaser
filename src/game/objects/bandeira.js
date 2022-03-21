import Phaser from 'phaser';

import SacoMoedas from './sacoModedas';
import storeJornada from '../../store/StoreJornada';
import storeTooltip from '../../store/StoreTooltip';
import storeToast from '../../store/StoreToast';

const COLOR_PRIMARY = 0x007bff;
export default class Bandeira extends Phaser.GameObjects.Image {
    constructor(scene, x, y, playerSetPostion, player, name, sacoMoedas, restoObj, proximaBandeira, emitter) {
        super(scene, x, y, restoObj.left ? `bandeiraE${restoObj.ordem}` : `bandeiraD${restoObj.ordem}`);
        this.X = x;
        this.Y = y;
        this.name = name;
        this.sacoMoedas = sacoMoedas;
        this.player = player;
        this.playerSetPostion = playerSetPostion;
        this.scene.add.existing(this);
        this.interactveAula = this.setInteractive();
        this.scene.physics.world.enableBody(this, 0);
        this.objAula = { name, ...restoObj, sacoMoedas };
        this.moedasPega = false;
        this.proximaBandeira = proximaBandeira;
        this.meuCadeado = null;
        this.particles = null;
        this.emitter = emitter;
        this._init();
    }

    createAnimationSet() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 8,
            repeat: -1,
        });
    }

    liberaBandeira() {
        this.objAula.desbloqueada = true;
        this.meuCadeado.visible = false;
        this.emitter.startFollow(this);
    }

    pegaMoeda() {
        this.moedasPega = true;
        console.log('tentenado mudar valor de moeda');
    }

    openPopUp() {
        this.proximaBandeira.liberaBandeira();
        storeJornada.abrePopupVideo(this.objAula.VideoId);
        if (this.sacoMoedas && !this.moedasPega) {
            console.log('criou saco');
            new SacoMoedas(this.scene, this.sacoMoedas.x, this.sacoMoedas.y, this.sacoMoedas.playerPostion, this.player, this);
        }
    }

    _init() {
        this.setDepth(10);
        // this.particles = this.scene.add.particles('white');
        // this.particles.setDepth(5);
        // this.emitter = this.particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 0.07, end: 0 },
        //     blendMode: 'ADD',
        // });

        if (this.objAula.ordem == 1) {
            //inicia a bandeira 1 com o brilho
            this.emitter.startFollow(this);
        }

        if (!this.objAula.desbloqueada) {
            //inicia a bandeira bandeiras bloqueadas com cadeado
            this.meuCadeado = this.scene.add.image(this.X - 20, this.Y + 25, 'cadeadoNew');
            this.meuCadeado.scale = 0.4;
            this.meuCadeado.setDepth(10);
            //  this.emitter.startFollow(this);
        }

        this.interactveAula.on('pointerup', () => {
            console.log('Clicou na aula, ', !this.objAula.desbloqueada);

            if (!this.objAula.desbloqueada) {
                console.log(this.scene.camera.worldView);
                storeToast.togggleToast(true, 'Poxa 😔.', 'Esta aula ainda não foi desbloqueada');
                setTimeout(() => {
                    storeToast.togggleToast(false, '', '');
                }, 2000);

                return; // Finaliza o click caso a aula ainda estaja bloqueada.
            }
            // this.emitter.stopFollow(this);//liga o brilho para ficar atras da bandeira.

            //CLICANDO NO OBJETO MANDO ELE PARA LÁ NAS COORDANADAS ESPECIFICAS
            //A BIBLIOTECA STAR CALCULA O TRAJETO EM TILES, POR ISSO AS COORDENADAS SÃO DIVIDAS PELO TILESIZE
            const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
            console.log('Posicao player bandeira', this.playerSetPostion.x, this.playerSetPostion.y);
            this.scene.findPathAndMove(
                PlayerX,
                PlayerY,
                this.playerSetPostion.x + 4,
                this.playerSetPostion.y + 7,
                this.openPopUp.bind(this),
            );
        });

        this.interactveAula.on('pointerover', function (pointer, item) {
            const posX = window.event.clientX;
            const posY = window.event.clientY;
            storeTooltip.togggleTooltip(true, posX, posY, this.name, `Aula ${this.objAula.ordem}:`);
            console.log(this, posX, posY);
        });

        this.interactveAula.on('pointerout', function (pointer, item) {
            storeTooltip.togggleTooltip(false);
            // console.log('tiro o mouse em cima');
        });
    }
}
