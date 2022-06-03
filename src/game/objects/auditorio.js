import Phaser from 'phaser';

import storePopUps from '../../store/StorePopUps';
import storeTooltip from '../../store/StoreTooltip';

const COLOR_PRIMARY = 0x007bff;
export default class Auditorio extends Phaser.GameObjects.Image {
    constructor(scene, x, y, player, name, restoObj) {
        super(scene, x, y, `predio_auditorio`);
        this.X = x;
        this.Y = y;
        this.name = name;
        this.player = player;
        this.scene.add.existing(this);
        this.interactveAula = this.setInteractive();
        this.retanguloAjusteClick = null;
        this.scene.physics.world.enableBody(this, 0);
        this.objAula = { name, ...restoObj };

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

    openPopUp() {
        storePopUps.openOnePopUp('auditorio');
    }

    _init() {
        this.setDepth(25);
        this.scale = 1.15;
        this.retanguloAjusteClick = this.scene.add.rectangle(
            980,
            725,
            200,
            230,
            // window.location.origin.includes('localhost') ? 0xff0000 : 0xffffff00,
        );

        this.retanguloAjusteClick.setDepth(30);
        this.retanguloAjusteClick.setInteractive().on('pointerup', () => {
            //CLICANDO NO OBJETO MANDO  ELE PARA LÁ NAS COORDANADAS ESPECIFICAS
            //A BIBLIOTECA STAR CALCULA O TRAJETO EM TILES, POR ISSO AS COORDENADAS SÃO DIVIDAS PELO TILESIZE
            const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
            console.log('Posicao player bandeira', 30, 28);
            this.scene.findPathAndMove(PlayerX, PlayerY, 30, 28, this.openPopUp.bind(this));
        });

        // this.interactveAula.on('pointerup', () => {
        //     //CLICANDO NO OBJETO MANDO  ELE PARA LÁ NAS COORDANADAS ESPECIFICAS
        //     //A BIBLIOTECA STAR CALCULA O TRAJETO EM TILES, POR ISSO AS COORDENADAS SÃO DIVIDAS PELO TILESIZE
        //     const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
        //     console.log('Posicao player bandeira', 30, 28);
        //     this.scene.findPathAndMove(PlayerX, PlayerY, 30, 28, this.openPopUp.bind(this));
        // });

        this.interactveAula.on('pointerover', function (pointer, item) {
            const posX = window.event.clientX;
            const posY = window.event.clientY;
            storeTooltip.togggleTooltip(true, posX, posY, `Aqui voce podera ver as lives referente a este curso.`, this.name);
        });

        this.interactveAula.on('pointerout', function (pointer, item) {
            storeTooltip.togggleTooltip(false);
        });
    }
}
