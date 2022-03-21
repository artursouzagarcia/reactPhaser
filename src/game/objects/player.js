import Phaser from 'phaser';

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
        // CRIA OS SETAS DE ANIMAÇÃO
        //CADA SET USA OS SPRITES QUE INFORMAR NOS FRAMES
        //PODE COLOCAR DURATION TB EM MS

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', { frames: [6] }),
            frameRate: 8,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [4, 5, 7, 8],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'top',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [10, 9, 11],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'bottom',
            frames: this.scene.anims.generateFrameNumbers('avatarSprit', {
                frames: [13, 12, 14],
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.play('idle');
    }

    getPositionInTiles() {
        return { x: Math.floor(this.x / 32), y: Math.floor(this.y / 32) };
    }

    move(path, map, acaoDepoisDeAndar) {
        //FUNC QUE CRIA TIMELINE DE TWEENS QUE SÃO ALTERAÇÕES SEQUENCIAIS DE PROPS DE UM OBJETO
        // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
        if (this.timeline) {
            this.timeline.destroy();
        }
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
                            this.play('right', true);
                        } else {
                            //esquerda
                            this.play('left', true);
                        }
                    } else {
                        // movimentando no eixo Y
                        if (eixoY.end > eixoY.start) {
                            //baixo
                            this.play('bottom', true);
                        } else {
                            //cima
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

        const elementValorMoedas = document.getElementById('ValorMoedas');
        if (elementValorMoedas) elementValorMoedas.innerText = this.qtdMoedas;

        console.log('O player agora tem ' + this.qtdMoedas + ' moedas.');
    }

    ganhaDiamantes() {
        this.qtdDiamantes++;

        const elementValorMoedas = document.getElementById('ValorMoedas');
        if (elementValorMoedas) elementValorMoedas.innerText = this.qtdMoedas;

        console.log('O player agora tem ' + this.qtdMoedas + ' moedas.');
    }
}
