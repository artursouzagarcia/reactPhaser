import React, { useCallback, useState } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';
import testeImg from '../../assets/teste.png';
import Imagem01 from '../../assets/tutorial/Imagem 01.png';
import Imagem01A from '../../assets/tutorial/Imagem 01A.png';
import Imagem01B from '../../assets/tutorial/Imagem 01B.png';
import Imagem02 from '../../assets/tutorial/Imagem 02.png';
import Imagem02A from '../../assets/tutorial/Imagem 02A.png';
import Imagem02B from '../../assets/tutorial/Imagem 02B.png';
import Imagem03 from '../../assets/tutorial/Imagem 03.png';
import Imagem04 from '../../assets/tutorial/Imagem 04.png';
import Imagem05 from '../../assets/tutorial/Imagem 05.png';
import Imagem06 from '../../assets/tutorial/Imagem 06.png';
import Imagem07 from '../../assets/tutorial/Imagem 07.png';
import Imagem07B from '../../assets/tutorial/Imagem 07B.png';
import Imagem08 from '../../assets/tutorial/Imagem 08.png';

const PopUpHelp = ({ closePopUp }) => {
    const [indexSlide, setIndexSlide] = useState(0);

    const handlerSlide = useCallback(
        (voltar = false) => {
            if (voltar) {
                setIndexSlide((old) => (old == 0 ? listHelps.length - 1 : old - 1));
            } else {
                setIndexSlide((old) => (old == listHelps.length - 1 ? 0 : old + 1));
            }
        },
        [indexSlide],
    );

    return (
        <Container className="popup" id="popUpHelp" style={{ display: 'flex', userSelect: 'none' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Tutorial ${indexSlide + 1}/${listHelps.length - 1} - ${
                        listHelps[indexSlide].titulo
                    }`}</span>
                </div>
                <div className="close" onClick={() => closePopUp()}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp" style={{ flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }}>
                        <IoIosArrowDropleftCircle size="30px" color="#0d4860" onClick={() => handlerSlide(true)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, color: '#fff' }}>
                        {/* <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                            <h2>Conhecendo seu ambiente virtual de aprendizado.</h2>
                        </div> */}
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                            <div style={{ height: '100%', flex: 1 }}>
                                <img src={listHelps[indexSlide].image} style={{ height: '100%', width: '100%' }} />
                            </div>
                            <div style={{ height: '100%', flex: 1, alignItems: 'center', display: 'flex' }}>
                                <span style={{ whiteSpace: 'break-spaces' }}>{listHelps[indexSlide].mensagem}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }}>
                        <IoIosArrowDroprightCircle size="30px" color="#0d4860" onClick={() => handlerSlide(false)} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopUpHelp;

const listHelps = [
    {
        image: Imagem01,
        titulo: `Conhecendo seu ambiente virtual de aprendizado`,
        mensagem: `Bem vindo ao campus virtual universit??rio GAMMYX. Voc?? est?? iniciando uma nova jornada de aprendizado com um conceito totalmente revolucion??rio.

    Voc?? ir?? seguir a {{JORNADA}} andando com seu avatar pelo campus virtual.
    
    Cada aula em v??deo voc?? pode acessar clicando nas placas indicativas ao longo do caminho. As placas com cadeado est??o bloqueadas e s?? s??o liberadas caso voc?? assista a aula anterior. Passando o mouse sobre as placas voc?? tem uma descri????o do conte??odo daquela aula.
    `,
    },
    {
        image: Imagem01A,
        titulo: `Menu de usu??rio`,
        mensagem: `No canto superior esquerdo voc?? tem algumas op????es como a seta para esquerda, para voc?? voltar para seu painel de progresso do GAMMYX, o bot??o de nota musical que permite ligar e desligar efeitos sonoros, bot??o de ajuda, que abre esse tutorial,  al??m da moeda (GAMMYX COIN) e do DIAMANTE.

    O ??cone moeda mostra o saldo em GAMMYX COINS que voc?? acumulou nessa jornada de aprendizado. A cada fase da jornada (conjunto de aulas) e respostas certas ??s perguntas das aulas, voc?? ganha moedas virtuais do GAMMYX que valem desconto em outras jornadas de aprendizado ou at?? mesmo produtos, como livros por exemplo.
    
    O ??cone diamante permite que voc?? acesse itens especiais coletados ao longo da jornada como infogr??ficos e mapas mentais.
    
    Clicando no avatar do seu usu??rio voc?? acessa op????es do seu perfil.
    `,
    },
    {
        image: Imagem01B,
        titulo: `Conhecendo seu campus virtual`,
        mensagem: `Para andar pelo campus virtual, basta clicar com o mouse em qualquer ponto do caminho para seu avatar se movimentar para l??.

    No canto superior direito voc?? tem um mini mapa da sua jornada, mostrando sua posi????o relativa.
    `,
    },
    {
        image: Imagem02,
        titulo: `Pr??dio da Biblioteca `,
        mensagem: `Nele voc?? pode ver os livros textos recomendados para o conte??do dessa jornada, al??m de acessar os PDFs das aulas e listas de artigos cient??ficos refer??ncia das mesmas.`,
    },
    {
        image: Imagem02A,
        titulo: `Pr??dio do Audit??rio`,
        mensagem: `Nele voc?? tem a agenda das aulas ao-vivo agendadas pelo mentor da jornada.`,
    },
    {
        image: Imagem02B,
        titulo: `Pr??dio do Hospital`,
        mensagem: `Entrando no hospital voc?? tem casos cl??nicos apresentados para responder sobre as melhores condutas, sempre associados ao tema da jornada.`,
    },
    {
        image: Imagem03,
        titulo: `Tire suas d??vidas de forma diferente`,
        mensagem: `No canto inferior direito voc?? tem o avatar do mentor dessa jornada de aprendizado. Clicando sobre o avatar voc?? tem acesso ??s d??vidas mais frequentes dessa jornada, respondidas em v??deo pelo mentor.

    Para navegar entre as respostas mais comuns utilize as setas ?? direita e esquerda ou pela lista de perguntas.
    
    Se voc?? quiser enviar uma pergunta, basta clicar sobre o bot??o enviar pergunta.
    `,
    },
    {
        image: Imagem04,
        titulo: `Coletando moedas e diamantes`,
        mensagem: `Ao longo da sua jornada de aprendizado, conforme voc?? conclui algumas fases (conjunto de aulas) voc?? libera moedas que ficam no caminho (saco de moedas) - para obt??-las basta passar sobre as mesmas com seu avatar. 

    Da mesma forma voc?? pode coletar diamantes tamb??m (que s??o conte??dos extras, como infogr??ficos e mapas mentais liberados em algumas aulas).
    `,
    },
    { image: Imagem05, titulo: ``, mensagem: `` },
    { image: Imagem06, titulo: ``, mensagem: `` },
    {
        image: Imagem07,
        titulo: `Navegando na Biblioteca`,
        mensagem: `Na biblioteca voc?? tem placas indicativas do conte??do nas estantes de livro - basta andar at?? a estante e clicar sobre os livros para acessar o conte??do.`,
    },
    {
        image: Imagem07B,
        titulo: `Saindo da Biblioteca`,
        mensagem: `Para sair da biblioteca e voltar para o campus virtual, basta sair pela porta.`,
    },
    {
        image: Imagem08,
        titulo: `Como pego meu certificado de conclus??o?`,
        mensagem: `Ao t??rmino da sua jornada voc?? desbloqueia o certificado de conclus??o da mesma - como o n??mero de horas realizadas. Basta andar com seu avatar sobre o canudo do certificado para coletar seu diploma de conclus??o.`,
    },
];
