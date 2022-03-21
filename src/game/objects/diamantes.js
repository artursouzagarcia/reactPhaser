import Phaser from 'phaser';
const COLOR_PRIMARY = 0x007bff;

export default class Diamantes extends Phaser.GameObjects.Image {
    constructor(scene, x, y, player, bandeira) {
        super(scene, x, y, 'diamante');

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
        // this.interactveAula.on('pointerup', () => {
        //     //CLICANDO NO OBJETO MANDO ELE PARA LÁ NAS COORDANADAS ESPECIFICAS
        //     //A BIBLIOTECA STAR CALCULA O TRAJETO EM TILES, POR ISSO AS COORDENADAS SÃO DIVIDAS PELO TILESIZE
        //     const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
        //     this.scene.findPathAndMove(PlayerX, PlayerY, this.playerSetPostion.x / 32, this.playerSetPostion.y / 32);
        // });

        this.scale = 0.9;

        // this.scene.sound.add('coinsbag', { loop: false });
    }

    setColoder() {
        if (!this.isCollideable) {
            this.visible = true;
            this.isCollideable = true;
            this.scene.physics.add.overlap(this.player, this, this._collectCoins.bind(this));
        }
    }

    _collectCoins(player, sacodemoedas) {
        // contabiliza a moeda
        console.log('pegou diamanteeeee');
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
            .showMessage('Olha um dimante!');
        this.bandeira.pegaDiamante();
        player.ganhaDiamantes();
        //TOCA O EFEITO SONORO
        // this.collectcoinsaudioFX.play();
        //SOME COM O "CORPO"
        this.destroy();
    }
}
