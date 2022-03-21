import { makeAutoObservable } from 'mobx';

class StoreJornada {
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
}

export default new StoreJornada();
