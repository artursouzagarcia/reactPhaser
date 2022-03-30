import Phaser from 'phaser';

import StoreCasoClinico from '../../store/StoreCasoClinico';
import storeTooltip from '../../store/StoreTooltip';
import storeToast from '../../store/StoreToast';

export default class CasoClinico extends Phaser.GameObjects.Image {
    constructor(scene, x, y, casoClinico, player) {
        super(scene, x, y, 'imgPredio_campus2');
        this.casoClinico = casoClinico;
        this.meuCadeado = null;
        this.scene.add.existing(this);
        this.player = player;
        this.interactveAula = this.setInteractive();
        this.desbloqueado = casoClinico.desbloqueado;
        this._initClickOn();
        this.init();
        this.scene.physics.world.enableBody(this, 0);
    }

    init() {
        this.scale = 1.3;
        if (!this.casoClinico.desbloqueado) {
            //inicia a bandeira bandeiras bloqueadas com cadeado
            this.meuCadeado = this.scene.add.image(this.x - 38, this.y + 115, 'cadeadoNew');
            this.meuCadeado.scale = 0.4;
            this.meuCadeado.setDepth(10);
        }
    }

    desbloqueiaCasoClinico() {
        storeToast.togggleToast(true, '🏥 Casos clínicos', '🎉 Parabéns, você liberou casos clínicos.');
        this.desbloqueado = true;
        this.meuCadeado.visible = false;
    }

    openPopUp() {
        StoreCasoClinico.abrePopupVideo(this.casoClinico.objAula.VideoId);
    }

    _initClickOn() {
        this.interactveAula.on('pointerup', () => {
            console.log('Clicou no caso clinico');

            if (!this.desbloqueado) {
                storeToast.togggleToast(true, '🏥 Poxa 😔.', 'Estes casos clinicos ainda não foram desbloqueados.');

                setTimeout(() => {
                    // só para limpar o obj
                    storeToast.togggleToast(false, '', '');
                }, 2000);

                return; // Finaliza o click caso a aula ainda estaja bloqueada.
            }

            const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
            this.scene.findPathAndMove(
                PlayerX,
                PlayerY,
                this.casoClinico.playerPostion.x,
                this.casoClinico.playerPostion.y,
                this.openPopUp.bind(this),
            );
        });

        // this.scene.physics.add.overlap(this.player, this, this._collectCoins.bind(this));
    }
}
