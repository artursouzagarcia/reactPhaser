import { makeAutoObservable } from 'mobx';

class StoreCasoClinico {
    idAulaSelecionada = null;
    popUpVideoAulaAberto = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggglePopUpVideoAulaAberto() {
        this.popUpVideoAulaAberto = !this.popUpVideoAulaAberto;
    }

    selecionaAula(idAula) {
        this.idAulaSelecionada = idAula;
    }

    abrePopupVideo(idAula) {
        console.log('Mudando estado da store de Jornada');
        this.idAulaSelecionada = idAula;
        this.popUpVideoAulaAberto = true;
    }

    fechaPopupVideo() {
        console.log('Mudando estado da store de Jornada');
        this.idAulaSelecionada = null;
        this.popUpVideoAulaAberto = false;
    }
}

export default new StoreCasoClinico();
