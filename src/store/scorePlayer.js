import { makeAutoObservable } from 'mobx';

class ScorePlayer {
    diamantes = [];
    moedas = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increaseMoedas() {
        this.moedas += 1;
    }

    increaseDiamantes(url) {
        if (url) this.diamantes.push(url);
    }
}

export default new ScorePlayer();
