import { makeAutoObservable } from 'mobx';

class StoreTooltip {
    aberto = false;
    x = 1;
    y = 1;
    texto = '';
    title = '';
    constructor() {
        makeAutoObservable(this);
    }

    togggleTooltip(aberto = false, x = 1, y = 1, texto = '', title = '') {
        this.aberto = aberto;
        this.x = x;
        this.y = y;
        this.texto = texto;
        this.title = title;
    }
}

export default new StoreTooltip();
