import { makeAutoObservable } from 'mobx';

class StoreCongratulations {
    popups = {
        isOpen: false,
        diamante: false,
        moeda: false,
        diploma: false,
    };

    constructor() {
        makeAutoObservable(this);
    }

    getPropertyInArray() {
        return Object.getOwnPropertyNames(this.popups);
    }

    closeAllPopUps() {
        let newState = {};
        this.getPropertyInArray().forEach((element) => {
            return (newState[element] = false);
        });
        this.popups = { ...newState };
    }

    openOnePopUp(name) {
        console.log('tentando abrir um popup ' + name);
        let newState = {};
        if (!name) {
            return this.closeAllPopUps();
        }

        this.getPropertyInArray().forEach((element) => {
            if (name == element) {
                return (newState[element] = true);
            }
            return (newState[element] = false);
        });
        this.popups = { ...newState, isOpen: true };
    }
}

export default new StoreCongratulations();
