import Phaser from 'phaser';
import camposJson from '../assets/tilemaps/json/campus.json';
import tileset_ground_campus from '../assets/tilemaps/tiles/tileset_ground_campus.png';
import tileset_elements_campus from '../assets/tilemaps/tiles/tileset_elements_campus.png';
import seta_direita from '../assets/seta_direita.png';
import predio_campus1 from '../assets/predio_campus1.png';
import predio_campus2 from '../assets/predio_campus2.png';
import sacodemoedas from '../assets/Sacodemoedas.png';
import Duvida from '../assets/Duvida.png';
import dude from '../assets/dude.png';
import avatar_sprite from '../assets/avatar_sprite.png';
import button_start from '../assets/button_start.png';
import button_start_click from '../assets/button_start_click.png';
import tooltipBG from '../assets/tooltipBG.png';
import professor_carloslopes from '../assets/professor_carloslopes.png';
import placa_duvidas from '../assets/placa_duvidas.png';

import bandeiraD1 from '../assets/seta_direita1.png';
import bandeiraD2 from '../assets/seta_direita2.png';
import bandeiraD3 from '../assets/seta_direita3.png';
import bandeiraD4 from '../assets/seta_direita4.png';
import bandeiraD5 from '../assets/seta_direita5.png';
import bandeiraD6 from '../assets/seta_direita6.png';
import bandeiraD7 from '../assets/seta_direita7.png';
import bandeiraD8 from '../assets/seta_direita8.png';
import bandeiraD9 from '../assets/seta_direita9.png';
import bandeiraD10 from '../assets/seta_direita10.png';
import bandeiraD11 from '../assets/seta_direita11.png';
import bandeiraD12 from '../assets/seta_direita12.png';
import bandeiraD13 from '../assets/seta_direita13.png';
import bandeiraD14 from '../assets/seta_direita14.png';
import bandeiraD15 from '../assets/seta_direita15.png';
import bandeiraD16 from '../assets/seta_direita16.png';
import bandeiraD17 from '../assets/seta_direita17.png';
import bandeiraD18 from '../assets/seta_direita18.png';
import bandeiraD19 from '../assets/seta_direita19.png';
import bandeiraD20 from '../assets/seta_direita20.png';

import bandeiraE1 from '../assets/seta_esquerda1.png';
import bandeiraE2 from '../assets/seta_esquerda2.png';
import bandeiraE3 from '../assets/seta_esquerda3.png';
import bandeiraE4 from '../assets/seta_esquerda4.png';
import bandeiraE5 from '../assets/seta_esquerda5.png';
import bandeiraE6 from '../assets/seta_esquerda6.png';
import bandeiraE7 from '../assets/seta_esquerda7.png';
import bandeiraE8 from '../assets/seta_esquerda8.png';
import bandeiraE9 from '../assets/seta_esquerda9.png';
import bandeiraE10 from '../assets/seta_esquerda10.png';
import bandeiraE11 from '../assets/seta_esquerda11.png';
import bandeiraE12 from '../assets/seta_esquerda12.png';
import bandeiraE13 from '../assets/seta_esquerda13.png';
import bandeiraE14 from '../assets/seta_esquerda14.png';
import bandeiraE15 from '../assets/seta_esquerda15.png';
import bandeiraE16 from '../assets/seta_esquerda16.png';
import bandeiraE17 from '../assets/seta_esquerda17.png';
import bandeiraE18 from '../assets/seta_esquerda18.png';
import bandeiraE19 from '../assets/seta_esquerda19.png';
import bandeiraE20 from '../assets/seta_esquerda20.png';
import cadeadoNew from '../assets/Cadeado.png';
import cadeadoSprite from '../assets/cadeadoSprite.png';
import white from '../assets/white.png';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.readyCount = 0;
    }

    preload() {
        // this.load.image('logoMEDX', logo);
        this.add.image(400, 200, 'logoMEDX');
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const { width } = this.cameras.main;
        const { height } = this.cameras.main;

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#FF0000',
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#000000',
            },
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff',
            },
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            percentText.setText(`${parseInt(value * 100, 10)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText(`Loading asset: ${file.key}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        });

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        //PRE=LOAD CARREGA TODOS OS ASSETS E COLOCA REFERENCIADOS EM ALIAS

        this.load.image('tiles', tileset_ground_campus);
        this.load.image('tilesElements', tileset_elements_campus);
        this.load.image('white', white);

        //CARREGA JSON DO TILEMAP EXPORTADO NO TILED
        this.load.tilemapTiledJSON('map', camposJson);
        this.load.image('imgBandeira', seta_direita);
        this.load.image('imgPredio_campus1', predio_campus1);
        this.load.image('imgPredio_campus2', predio_campus2);
        this.load.image('sacodemoedas', sacodemoedas);
        this.load.image('duvidas', Duvida);

        //CARREGA UM SPRITE (DUDE.PNG) QUE TEM A SEQ PARA ANIMAÇÃO
        this.load.spritesheet('dude', dude, {
            frameWidth: 32,
            frameHeight: 48,
        });

        this.load.spritesheet('avatarSprit', avatar_sprite, {
            frameWidth: 64,
            frameHeight: 104,
        });

        this.load.spritesheet('cadeadoSprite', avatar_sprite, {
            frameWidth: 64,
            frameHeight: 100,
        });

        // this.load.audio('coinsbag', 'src/assets/soundfx/1_Coins.ogg');
        this.load.image('start_button', button_start);
        this.load.image('start_button_click', button_start_click);

        this.load.image('tooltipBG', tooltipBG);
        this.load.image('professorCarloslopes', professor_carloslopes);
        this.load.image('placa_duvidas', placa_duvidas);

        this.load.image('cadeadoNew', cadeadoNew);

        console.log(bandeiraD1, bandeiraD2, bandeiraD3, bandeiraE1, bandeiraE2, bandeiraE3);
        // this.textures.addBase64('bandeiraD1', bandeiraD1);

        this.load.image('bandeiraD1', bandeiraD1);
        this.load.image('bandeiraD2', bandeiraD2);
        this.load.image('bandeiraD3', bandeiraD3);

        this.load.image('bandeiraD4', bandeiraD4);
        this.load.image('bandeiraD5', bandeiraD5);
        this.load.image('bandeiraD6', bandeiraD6);
        this.load.image('bandeiraD7', bandeiraD7);
        this.load.image('bandeiraD8', bandeiraD8);
        this.load.image('bandeiraD9', bandeiraD9);
        this.load.image('bandeiraD10', bandeiraD10);
        this.load.image('bandeiraD11', bandeiraD11);
        this.load.image('bandeiraD12', bandeiraD12);
        this.load.image('bandeiraD13', bandeiraD13);
        this.load.image('bandeiraD14', bandeiraD14);
        this.load.image('bandeiraD15', bandeiraD15);
        this.load.image('bandeiraD16', bandeiraD16);
        this.load.image('bandeiraD17', bandeiraD17);
        this.load.image('bandeiraD18', bandeiraD18);
        this.load.image('bandeiraD19', bandeiraD19);
        this.load.image('bandeiraD20', bandeiraD20);
        this.load.image('bandeiraE1', bandeiraE1);
        this.load.image('bandeiraE2', bandeiraE2);
        this.load.image('bandeiraE3', bandeiraE3);
        this.load.image('bandeiraE4', bandeiraE4);
        this.load.image('bandeiraE5', bandeiraE5);
        this.load.image('bandeiraE6', bandeiraE6);
        this.load.image('bandeiraE7', bandeiraE7);
        this.load.image('bandeiraE8', bandeiraE8);
        this.load.image('bandeiraE9', bandeiraE9);
        this.load.image('bandeiraE10', bandeiraE10);
        this.load.image('bandeiraE11', bandeiraE11);
        this.load.image('bandeiraE12', bandeiraE12);
        this.load.image('bandeiraE13', bandeiraE13);
        this.load.image('bandeiraE14', bandeiraE14);
        this.load.image('bandeiraE15', bandeiraE15);
        this.load.image('bandeiraE16', bandeiraE16);
        this.load.image('bandeiraE17', bandeiraE17);
        this.load.image('bandeiraE18', bandeiraE18);
        this.load.image('bandeiraE19', bandeiraE19);
        this.load.image('bandeiraE20', bandeiraE20);
    }

    ready() {
        this.scene.start('ObsidadeScene');

        this.readyCount += 1;
        if (this.readyCount === 2) {
            this.scene.start('ObsidadeScene');
        }
    }
}
