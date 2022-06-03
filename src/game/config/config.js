import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
export default {
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    backgroundColor: '#000',
    width: window.innerWidth,
    height: window.innerHeight,
    dom: {
        createContainer: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: window.location.origin.includes('localhost') ? false : false,
        },
    },

    parent: 'phaser-container',
    scale: {
        mode: Phaser.Scale.FIT,
    },
    plugins: {
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI',
            },
        ],
    },
};
