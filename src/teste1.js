import React, { useState } from "react";

import Timer from "./store/teste";

import Phaser from "phaser";
import configPhaserGame from "./PhaserGame";
import HelloWorldScene from "./scenes/HelloWorldScene";

let _game = null;
const handleClick = () => {
  _game = new Phaser.Game(configPhaserGame);
  console.log(_game);
  // const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  // scene.createEmitter()
};

const runDestroyGame = () => {
  if (_game) _game.destroy(true);
};

export function TestePage() {
  function adicona(params) {
    console.log("add");
    Timer.increaseTimer();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Pagina 1</h1>
      <button onClick={handleClick}>Inicia Jogo</button>
      <button onClick={adicona}>Btn Pagina 1</button>
    </div>
  );
}
