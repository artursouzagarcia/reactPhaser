import { makeAutoObservable } from 'mobx';

class StoreToast {
    aberto = false;
    title = '';
    texto = '';

    constructor() {
        makeAutoObservable(this);
    }

    togggleToast(aberto = false, texto = '', title = '') {
        this.aberto = aberto;
        this.texto = texto;
        this.title = title;
    }
}

export default new StoreToast();
