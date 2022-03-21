import { makeAutoObservable } from 'mobx';
class Timer {
    secondsPassed = 0;
    objAula = '';

    constructor() {
        makeAutoObservable(this);
    }

    increaseTimer() {
        console.log('add aq');
        this.secondsPassed += 1;
    }
    addAula(obj) {
        this.objAula = JSON.stringify(obj);
    }
}

export default new Timer();
