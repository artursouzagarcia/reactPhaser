import { makeAutoObservable } from 'mobx';
class StoreAmbienceSound {
    isPlaying = true;

    constructor() {
        makeAutoObservable(this);
    }

    play() {
        this.isPlaying = true;
    }

    stop() {
        this.isPlaying = false;
    }
}

export default new StoreAmbienceSound();
