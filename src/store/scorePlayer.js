import { makeAutoObservable } from 'mobx';
import anime from 'animejs';

function amimacao(elemento, mensagem) {
    try {
        const { top, left, width, height } = document.getElementById(elemento).getBoundingClientRect();
        const meioX = window.innerWidth / 2 - left - width / 2;
        const meioY = window.innerHeight / 2 - top - height / 2;
        const containerTextoParabens = document.getElementById('containerTextoParabens');

        const textSaudacao = document.getElementById('textoParabens');
        textSaudacao.innerText = mensagem;

        anime({
            targets: '#' + elemento,
            translateX: [
                { value: meioX, duration: 10, delay: 0 },
                { value: 0, duration: 2000, delay: 1000 },
            ],
            translateY: [
                { value: meioY, duration: 10, delay: 0 },
                { value: 0, duration: 2000, delay: 1000 },
            ],
            scale: [
                { value: 3, duration: 10, delay: 0 },
                { value: 1, duration: 2000, delay: 1000 },
            ],
            easing: 'easeOutElastic(1, .8)',
            begin: function (anim) {
                containerTextoParabens.style.display = 'flex';
            },
            complete: function (anim) {
                containerTextoParabens.style.display = 'none';
            },
        });
    } catch (error) {
        console.log('erro ao tentar fazer animacao');
        console.error(error);
    }
}
class ScorePlayer {
    diamantes = [];
    moedas = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increaseMoedas() {
        this.moedas += 1;
        amimacao('moedaImgScore', 'Parabéns você ganhou uma moeda!');
    }

    increaseDiamantes(url) {
        if (url) this.diamantes.push(url);
        amimacao('diamanteImgScore', 'Parabéns você ganhou um diamante!');
    }
}

export default new ScorePlayer();
