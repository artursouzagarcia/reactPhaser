import { makeAutoObservable } from 'mobx';

class StorePopUps {
    popups = {
        perguntaEnviada: false,
        listPDFs: false,
        leitoPDF: false,
        referencias: false,
        auditorio: false,
        bibliografia: false,
        livros: false,
        links: false,
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
        this.popups = { ...newState };
    }
}

export default new StorePopUps();
