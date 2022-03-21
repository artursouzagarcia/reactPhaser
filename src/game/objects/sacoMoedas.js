import Phaser from 'phaser';
const COLOR_PRIMARY = 0x007bff;

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
        // this.scene.sound.add('coinsbag', { loop: false });
    }

    _collectCoins(player, sacodemoedas) {
        // contabiliza a moeda
        this.scene.rexUI.add
            .toast({
                x: this.scene.camera.worldView.x + this.scene.camera.worldView.width / 2,
                y: this.scene.camera.worldView.y + this.scene.camera.worldView.height - 100,
                background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
                text: this.scene.add.text(0, 0, '', {
                    fontSize: '18px',
                }),
                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                },
            })
            .showMessage('Olha um saco de moedas!');
        this.bandeira.pegaMoeda();
        player.ganhaMoeda();
        //TOCA O EFEITO SONORO
        // this.collectcoinsaudioFX.play();
        //SOME COM O "CORPO"
        this.destroy();
    }
}
