import EasyStar from 'easystarjs';
import Phaser from 'phaser';
import Player from '../objects/player';
import Bandeira from '../objects/bandeira';
import PhaserTooltip, { addTooltip } from '../components/tooltips';
import aulasMOKE from '../../store/mokeAula';

const COLOR_PRIMARY = 0x007bff;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const CreateDOM = function (scene, content) {
    var dom = scene.add.dom().createFromHTML(content);
    dom.node.style.width = '400px';
    dom.updateSize();
    return dom;
};
export default class GameScene extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        this.map = null;
        this.tiles = null;
        this.layer = null;
        this.player = null;
        this.finder = new EasyStar.js();
        this.target = new Phaser.Math.Vector2();
        this.Bandeiras = [];
        this.scoreText = null;
        this.camera = null;
        this.scoreTextMoedas = null;
        this.scoreTextDiamantes = null;
        this.duvidaImage = null;
        this.emitter = null;
    }

    preload() {
        this.load.scenePlugin('ObsidadeScene', PhaserTooltip, 'PhaserTooltip', 'tooltip');
    }

    create() {
        //FUNCAO CREATE MONTA O JOGO

        this.input.on('pointerup', this.handleClickInMap.bind(this));
        //cria mapa
        this.map = this.make.tilemap({ key: 'map' });
        //CADA LAYER TEM QUE SER CRIADO COMO OBJETO SEPARADO, COM SEUS TILES DE ORIGEM
        this.camera = this.cameras.main;
        this.camera.setVisible(true);

        this.tilesElements = this.map.addTilesetImage('tileset_elements_campus', 'tilesElements');
        this.tiles = this.map.addTilesetImage('tileset_ground_campus', 'tiles');

        this.layer = this.map.createLayer('Ground', this.tiles, 0, 0);
        this.layerElements2 = this.map.createLayer('Elementos2', this.tilesElements, 0, 0);
        this.layerElements1 = this.map.createLayer('Elementos1', this.tilesElements, 0, 0);
        this.layerElements = this.map.createLayer('Elementos', this.tilesElements, 0, 0);
        // this.layerElements2.setDepth(27);
        // this.layerElements1.setDepth(26);
        this.layerElements2.setDepth(10);
        this.layerElements.setDepth(25);

        this.player = new Player(this, 45 + 50, 1060 + 200, 'avatarSprit');
        this.player.scale = 0.8;
        this.player.setDepth(15);
        this.particles = this.add.particles('white');
        this.particles.setDepth(5);
        this.emitter = this.particles.createEmitter({
            speed: 80,
            scale: { start: 0.07, end: 0 },
            blendMode: 'ADD',
        });

        //criando bandeira de aulas
        for (let index = aulasMOKE.length - 1; index >= 0; index--) {
            const { positions, playerPostion, Title, sacoMoedas, ...resto } = aulasMOKE[index];

            if (index != aulasMOKE.length - 1) {
                //cria a proxima bandeira com a referencia da anterior
                const bandeira = new Bandeira(
                    this,
                    positions.x + 150,
                    positions.y + 220,
                    playerPostion,
                    this.player,
                    Title,
                    sacoMoedas,
                    resto,
                    this.Bandeiras[this.Bandeiras.length - 1],
                    this.emitter,
                );

                this.Bandeiras.push(bandeira);
            } else {
                // ultima bandeira que não precisa da referencia da anterior pois não vai ter que libera-la
                const bandeira = new Bandeira(
                    this,
                    positions.x + 50,
                    positions.y + 200,
                    playerPostion,
                    this.player,
                    Title,
                    sacoMoedas,
                    resto,
                    false,
                    this.emitter,
                );
                this.Bandeiras.push(bandeira);
            }
        }
        this.Bandeiras.forEach((Bandeiras) => (Bandeiras.scale = 0.8));
        // console.log(this.Bandeiras);

        this.map.currentLayerIndex = 0;

        const Predio_campus1 = this.add.image(305 + 160, 720 + 220, 'imgPredio_campus1');
        const Predio_campus4 = this.add.image(400 + 160, 200 + 220, 'imgPredio_campus1');
        const Predio_campus5 = this.add.image(1010, 710, 'imgPredio_campus1');
        Predio_campus1.setDepth(25);
        Predio_campus4.setDepth(25);
        Predio_campus5.setDepth(25);
        // const Predio_campus5 = this.add.image(975, 360, 'imgPredio_campus1');

        // Place the player above the tile layers
        // this.player.setDepth(10);
        // Place the overhead layer above everything else
        // overheadLayer.setDepth(20);

        //DEFINE A CAMERA COM LIMITES DO MAPA, ZOOM 100%, CENTRALIZA EM 0,0 PARA COMEÇAR
        // debugger;

        const larguraContainerMiniCam = window.innerWidth > 900 ? 250 : 200;

        this.minimap = this.cameras
            // .add(window.innerWidth - tamanhoMiniMap.width / 5, 10, tamanhoMiniMap.width / 5, tamanhoMiniMap.height / 5)
            .add(window.innerWidth - larguraContainerMiniCam, 10)
            .setZoom(window.innerWidth > 900 ? 0.1 : 0.07)
            .setName('mini');

        this.minimap.alpha = 0.9;
        this.minimap.setSize(larguraContainerMiniCam, window.innerWidth > 900 ? 200 : 150);
        // this.minimap.setBackgroundColor(0x002244);
        this.minimap.setBounds(0, 0);

        this.camera.setBounds(0, 0, this.map.width * 32, this.map.height * 32);
        this.camera.startFollow(this.player); //SEGUE O JOGADOR
        this.physics.add.collider(this.player, this.layer);
        this.configPathFinder();
    }

    update() {
        this.player.lastpositionX = this.player.body.position.x;
        this.player.lastpositionY = this.player.body.position.y;
    }

    configPathFinder() {
        const getTileID = (x, y) => {
            //AQUI CATA QUAL CODIGO DO TILE PELA COORDENADA X,Y
            var tile = this.map.getTileAt(x, y, false, this.layer);
            if (tile != null) {
                return tile.index;
            }
        };

        let tileset = this.map.tilesets[0];
        let properties = tileset.tileProperties;
        let acceptableTiles = [];
        let grid = [];

        for (var y = 0; y < this.map.height; y++) {
            let col = [];
            for (var x = 0; x < this.map.width; x++) {
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(getTileID(x, y));
            }
            grid.push(col);
        }

        this.finder.setGrid(grid);

        //FUNCAO QUE CARREGA EM MATRIZ OS TILES ACEITÁVEIS PARA "ANDAR"

        // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
        // and see what properties have been entered in Tiled.
        for (var i = tileset.firstgid - 1; i < this.tiles.total; i++) {
            // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset

            if (!properties.hasOwnProperty(i)) {
                // If there is no property indicated at all, it means it's a walkable tile
                acceptableTiles.push(i + 1);
                continue;
            }

            if (!properties[i].collides) {
                acceptableTiles.push(i + 1);
                continue;
            }
        }

        this.finder.setAcceptableTiles(acceptableTiles);
    }

    handleClickInMap(pointer) {
        let tileClicked = this.map.getTileAtWorldXY(pointer.worldX, pointer.worldY);
        // if (tileClicked.index !== 33) {
        //     return console.log('Clicou fora');
        // }
        const { x: fromX, y: fromY } = this.player.getPositionInTiles();

        this.findPathAndMove(fromX, fromY, tileClicked.x, tileClicked.y);
    }

    findPathAndMove(fromX, fromY, toX, toY, acaoDepoisDeAndar) {
        //converte coordenadas para int caso venham de cálculos com decimal
        fromX = parseInt(fromX);
        fromY = parseInt(fromY);
        toX = parseInt(toX);
        toY = parseInt(toY);
        this.finder.findPath(fromX, fromY, toX, toY, (path) => {
            if (path === null) {
                return console.error('Path was not found.');
            } else {
                // this.moveCharacter(path);
                console.log(toX, toY);
                this.player.move(path, this.map, acaoDepoisDeAndar);
            }
        });
        this.finder.calculate();
        //  // SE NÃO CHAMAR AQUI ELE NÃO FAZ NADA!
    }
}
