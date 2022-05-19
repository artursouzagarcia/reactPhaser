import Phaser from 'phaser';
import camposJson from '../assets/tilemaps/json/campus.json';
import predio_biblioteca from '../assets/predio_biblioteca.png';
import tileset_ground_campus from '../assets/tilemaps/tiles/tileset_ground_campus.png';
import tileset_elements_campus from '../assets/tilemaps/tiles/tileset_elements_campus.png';
import bibliotecaJson from '../assets/tilemaps/json/campus_indoor.json';
import tileset_elements_biblioteca from '../assets/tilemaps/tiles/tileset_elements_indoor.png';
import tileset_ground_biblioteca from '../assets/tilemaps/tiles/tileset_ground_indoor.png';
import janelaElementes from '../assets/tilemaps/tiles/janelas.png';
import seta_direita from '../assets/seta_direita.png';
import predio_campus1 from '../assets/predio_campus1.png';
import predio_campus2 from '../assets/predio_campus2.png';
import predio_auditorio from '../assets/predio_auditorio.png';
import sacodemoedas from '../assets/Sacodemoedas.png';
import diamante from '../assets/diamante.png';
import Duvida from '../assets/Duvida.png';
import dude from '../assets/dude.png';
import avatar_sprite from '../assets/avatar_sprite.png';
import button_start from '../assets/button_start.png';
import button_start_click from '../assets/button_start_click.png';
import tooltipBG from '../assets/tooltipBG.png';
import professor_carloslopes from '../assets/professor_carloslopes.png';
import placa_duvidas from '../assets/placa_duvidas.png';
import diploma from '../assets/Diploma.png';
import bandeiraD1 from '../assets/aula1.png';
import bandeiraD2 from '../assets/aula2.png';
import bandeiraD3 from '../assets/aula3.png';
import bandeiraD4 from '../assets/aula4.png';
import bandeiraD5 from '../assets/aula5.png';
import bandeiraD6 from '../assets/aula6.png';
import bandeiraD7 from '../assets/aula7.png';
import bandeiraD8 from '../assets/aula8.png';
import bandeiraD9 from '../assets/aula9.png';
import bandeiraD10 from '../assets/aula10.png';
import bandeiraD11 from '../assets/aula11.png';
import bandeiraD12 from '../assets/aula12.png';
import bandeiraD13 from '../assets/aula13.png';
import bandeiraD14 from '../assets/aula14.png';
import bandeiraD15 from '../assets/aula15.png';
import cadeadoNew from '../assets/Cadeado.png';
import cadeadoSprite from '../assets/cadeadoSprite.png';
import white from '../assets/white.png';
import red from '../assets/red.png';

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

        this.load.image('tilesGroundBiblioteca', tileset_ground_biblioteca);
        this.load.image('tilesElementsBiblioteca', tileset_elements_biblioteca);
        this.load.image('tilesJanelaBiblioteca', janelaElementes);
        //CARREGA JSON DO TILEMAP EXPORTADO NO TILED
        this.load.tilemapTiledJSON('map_biblioteca', bibliotecaJson);

        this.load.image('tiles', tileset_ground_campus);
        this.load.image('tilesElements', tileset_elements_campus);
        //CARREGA JSON DO TILEMAP EXPORTADO NO TILED
        this.load.tilemapTiledJSON('map', camposJson);

        this.load.image('white', white);
        this.load.image('red', red);

        this.load.image('imgBandeira', seta_direita);
        this.load.image('imgPredio_campus1', predio_campus1);
        this.load.image('imgPredio_campus2', predio_campus2);
        this.load.image('predio_biblioteca', predio_biblioteca);
        this.load.image('predio_auditorio', predio_auditorio);
        this.load.image('sacodemoedas', sacodemoedas);
        this.load.image('diamante', diamante);
        this.load.image('duvidas', Duvida);
        this.load.image('diploma', diploma);

        //CARREGA UM SPRITE (DUDE.PNG) QUE TEM A SEQ PARA ANIMAÇÃO
        this.load.spritesheet('dude', dude, {
            frameWidth: 32,
            frameHeight: 48,
        });

        this.load.spritesheet('avatarSprit', avatar_sprite, {
            frameWidth: 64,
            frameHeight: 128,
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
    }

    ready() {
        this.scene.start('BibliotecaScene');
        // this.scene.start('ObsidadeScene');

        this.readyCount += 1;
        if (this.readyCount === 2) {
            this.scene.start('BibliotecaScene');
            // this.scene.start('ObsidadeScene');
        }
    }
}
