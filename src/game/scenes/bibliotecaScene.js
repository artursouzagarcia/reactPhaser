import Phaser from 'phaser';
import EasyStar from 'easystarjs';
import Player from '../objects/player';

export default class BibliotecaScene extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        this.map = null;
        this.tiles = null;
        this.layer = null;
        this.player = null;
        this.finder = new EasyStar.js();
        this.target = new Phaser.Math.Vector2();
        this.camera = null;
        this.circulo = null;
        console.log('Biblioteca scene inicada!!!');
    }

    create() {
        this.input.on('pointerup', this.handleClickInMap.bind(this));
        this.map = this.make.tilemap({ key: 'map_biblioteca' });
        //CADA LAYER TEM QUE SER CRIADO COMO OBJETO SEPARADO, COM SEUS TILES DE ORIGEM
        this.camera = this.cameras.main;
        this.camera.setVisible(true);

        // this.tilesElements = this.map.addTilesetImage('tiles_elements_biblioteca', 'tilesElementsBiblioteca');
        // this.tiles = this.map.addTilesetImage('tileset_ground_biblioteca', 'tilesBiblioteca');

        this.tilesElements = this.map.addTilesetImage('Elementos_indoor', 'tilesElementsBiblioteca');
        this.tiles = this.map.addTilesetImage('indoor', 'tilesBiblioteca');

        this.layerElements = this.map.createLayer('Elementos', this.tilesElements, 0, 0);
        this.layer = this.map.createLayer('Geral', this.tiles, 0, 0);

        this.map.currentLayerIndex = 0;
        this.camera.setBounds(0, 0, this.map.width * 32, this.map.height * 32);

        this.player = new Player(this, 320, 290, 'avatarSprit');

        this.player.scale = 0.8;

        this.camera.startFollow(this.player); //SEGUE O JOGADOR

        this.circulo = this.add.rectangle(220, 260, 50, 80);
        // this.physics.add.existing(this.circulo);
        this.physics.world.enableBody(this.circulo, 0);

        this.physics.add.collider(this.player, this.layerElements);
        this.physics.add.collider(this.player, this.circulo, () => this.scene.start('ObsidadeScene'));
        this.configPathFinder();

        this.circulo.setDepth(25);
        this.layer.setDepth(0);
        this.layerElements.setDepth(15); // layer primeira arvore
        this.player.setDepth(25);

        setTimeout(() => {
            const { x: PlayerX, y: PlayerY } = this.player.getPositionInTiles();
            this.findPathAndMove(PlayerX, PlayerY, 12, 10);
        }, 200);
    }
    update() {
        // this.physics.add.collider(this.player, this.layerElements);
        // this.physics.add.collider(this.player, this.circulo);
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
                this.player.move(path, this.map, acaoDepoisDeAndar);
            }
        });
        this.finder.calculate();
        //  // SE NÃO CHAMAR AQUI ELE NÃO FAZ NADA!
    }
}