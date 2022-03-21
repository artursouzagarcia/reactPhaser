import Phaser from 'phaser';

import SacoMoedas from './sacoMoedas';
import Diamantes from './diamantes';
import storeJornada from '../../store/StoreJornada';
import storeTooltip from '../../store/StoreTooltip';
import storeToast from '../../store/StoreToast';
import CasoClinico from './casoClinico';

const COLOR_PRIMARY = 0x007bff;
export default class Bandeira extends Phaser.GameObjects.Image {
    constructor(scene, x, y, playerSetPostion, player, name, sacoMoedas, restoObj, proximaBandeira, emitter) {
        super(scene, x, y, restoObj.left ? `bandeiraE${restoObj.ordem}` : `bandeiraD${restoObj.ordem}`);
        this.X = x;
        this.Y = y;
        this.name = name;
        this.sacoMoedas = sacoMoedas;
        this.diamante = null;
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
        this.casoClinico = null;
        this.diploma = null;
        this.emitterDiploma = null;
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
    pegaDiamante() {
        this.objAula.diamantes.pego = true;
        console.log('tentenado mudar valor de diamantes');
    }

    openPopUp() {
        if (this.proximaBandeira) {
            this.proximaBandeira.liberaBandeira();
        }
        if (this.casoClinico) {
            this.casoClinico.desbloqueiaCasoClinico();
        }

        storeJornada.abrePopupVideo(this.objAula.VideoId);
        if (this.sacoMoedas && !this.moedasPega) {
            console.log('criou saco');
            new SacoMoedas(this.scene, this.sacoMoedas.x, this.sacoMoedas.y, this.sacoMoedas.playerPostion, this.player, this);
        }
    }

    _init() {
        this.setDepth(10);
        if (this.objAula.casoClinico) {
            //cria caso clinico caso existea na bandeira
            this.casoClinico = new CasoClinico(
                this.scene,
                this.objAula.casoClinico.posicao.x,
                this.objAula.casoClinico.posicao.y,
                {
                    ...this.objAula.casoClinico,
                    objAula: this.objAula,
                },
                this.player,
            );
        }

        if (this.objAula.diploma) {
            let diploma = this.scene.add.image(1700, 520, 'diploma');
            diploma.setDepth(10);
            let particles = this.scene.add.particles('red');
            particles.setDepth(5);
            let emitterDiploma = particles.createEmitter({
                speed: 220,
                scale: { start: 0.07, end: 0 },
                blendMode: 'ADD',
            });
            // emitterDiploma.startFollow(diploma);
            diploma.visible = false;
            this.diploma = {
                element: diploma,
                turnVisible: () => {
                    diploma.visible = true;
                    emitterDiploma.startFollow(diploma);
                },
            };
        }

        if (this.objAula?.diamantes && !this.objAula.diamantes.pego) {
            this.diamante = new Diamantes(
                this.scene,
                this.objAula.diamantes.posicao.x,
                this.objAula.diamantes.posicao.y,
                this.player,
                this,
            );
            this.diamante.visible = false;
        }

        if (this.objAula.ordem == 1) {
            //inicia a bandeira 1 com o brilho
            this.emitter.startFollow(this);
        }

        if (!this.objAula.desbloqueada) {
            //inicia a bandeira bandeiras bloqueadas com cadeado
            this.meuCadeado = this.scene.add.image(this.X - 20, this.Y + 25, 'cadeadoNew');
            this.meuCadeado.scale = 0.4;
            this.meuCadeado.setDepth(10);
        }

        this.interactveAula.on('pointerup', () => {
            console.log('Clicou na aula, ', !this.objAula.desbloqueada);

            if (!this.objAula.desbloqueada) {
                storeToast.togggleToast(true, 'Poxa 😔.', 'Esta aula ainda não foi desbloqueada');
                setTimeout(() => {
                    storeToast.togggleToast(false, '', '');
                }, 2000);

                return; // Finaliza o click caso a aula ainda estaja bloqueada.
            }

            //CLICANDO NO OBJETO MANDO ELE PARA LÁ NAS COORDANADAS ESPECIFICAS
            //A BIBLIOTECA STAR CALCULA O TRAJETO EM TILES, POR ISSO AS COORDENADAS SÃO DIVIDAS PELO TILESIZE
            if (this.objAula?.diamantes && !this.objAula.diamantes.pego) {
                this.diamante.setColoder();
            }
            if (this.diploma && this.diploma.element && this.diploma.turnVisible) {
                this.diploma.turnVisible();
            }

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
        });
    }
}
