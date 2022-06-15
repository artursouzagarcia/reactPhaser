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
        mensagem: `Bem vindo ao campus virtual universitário GAMMYX. Você está iniciando uma nova jornada de aprendizado com um conceito totalmente revolucionário.

    Você irá seguir a {{JORNADA}} andando com seu avatar pelo campus virtual.
    
    Cada aula em vídeo você pode acessar clicando nas placas indicativas ao longo do caminho. As placas com cadeado estão bloqueadas e só são liberadas caso você assista a aula anterior. Passando o mouse sobre as placas você tem uma descrição do conteúodo daquela aula.
    `,
    },
    {
        image: Imagem01A,
        titulo: `Menu de usuário`,
        mensagem: `No canto superior esquerdo você tem algumas opções como a seta para esquerda, para você voltar para seu painel de progresso do GAMMYX, o botão de nota musical que permite ligar e desligar efeitos sonoros, botão de ajuda, que abre esse tutorial,  além da moeda (GAMMYX COIN) e do DIAMANTE.

    O ícone moeda mostra o saldo em GAMMYX COINS que você acumulou nessa jornada de aprendizado. A cada fase da jornada (conjunto de aulas) e respostas certas às perguntas das aulas, você ganha moedas virtuais do GAMMYX que valem desconto em outras jornadas de aprendizado ou até mesmo produtos, como livros por exemplo.
    
    O ícone diamante permite que você acesse itens especiais coletados ao longo da jornada como infográficos e mapas mentais.
    
    Clicando no avatar do seu usuário você acessa opções do seu perfil.
    `,
    },
    {
        image: Imagem01B,
        titulo: `Conhecendo seu campus virtual`,
        mensagem: `Para andar pelo campus virtual, basta clicar com o mouse em qualquer ponto do caminho para seu avatar se movimentar para lá.

    No canto superior direito você tem um mini mapa da sua jornada, mostrando sua posição relativa.
    `,
    },
    {
        image: Imagem02,
        titulo: `Prédio da Biblioteca `,
        mensagem: `Nele você pode ver os livros textos recomendados para o conteúdo dessa jornada, além de acessar os PDFs das aulas e listas de artigos científicos referência das mesmas.`,
    },
    {
        image: Imagem02A,
        titulo: `Prédio do Auditório`,
        mensagem: `Nele você tem a agenda das aulas ao-vivo agendadas pelo mentor da jornada.`,
    },
    {
        image: Imagem02B,
        titulo: `Prédio do Hospital`,
        mensagem: `Entrando no hospital você tem casos clínicos apresentados para responder sobre as melhores condutas, sempre associados ao tema da jornada.`,
    },
    {
        image: Imagem03,
        titulo: `Tire suas dúvidas de forma diferente`,
        mensagem: `No canto inferior direito você tem o avatar do mentor dessa jornada de aprendizado. Clicando sobre o avatar você tem acesso às dúvidas mais frequentes dessa jornada, respondidas em vídeo pelo mentor.

    Para navegar entre as respostas mais comuns utilize as setas à direita e esquerda ou pela lista de perguntas.
    
    Se você quiser enviar uma pergunta, basta clicar sobre o botão enviar pergunta.
    `,
    },
    {
        image: Imagem04,
        titulo: `Coletando moedas e diamantes`,
        mensagem: `Ao longo da sua jornada de aprendizado, conforme você conclui algumas fases (conjunto de aulas) você libera moedas que ficam no caminho (saco de moedas) - para obtê-las basta passar sobre as mesmas com seu avatar. 

    Da mesma forma você pode coletar diamantes também (que são conteúdos extras, como infográficos e mapas mentais liberados em algumas aulas).
    `,
    },
    { image: Imagem05, titulo: ``, mensagem: `` },
    { image: Imagem06, titulo: ``, mensagem: `` },
    {
        image: Imagem07,
        titulo: `Navegando na Biblioteca`,
        mensagem: `Na biblioteca você tem placas indicativas do conteúdo nas estantes de livro - basta andar até a estante e clicar sobre os livros para acessar o conteúdo.`,
    },
    {
        image: Imagem07B,
        titulo: `Saindo da Biblioteca`,
        mensagem: `Para sair da biblioteca e voltar para o campus virtual, basta sair pela porta.`,
    },
    {
        image: Imagem08,
        titulo: `Como pego meu certificado de conclusão?`,
        mensagem: `Ao término da sua jornada você desbloqueia o certificado de conclusão da mesma - como o número de horas realizadas. Basta andar com seu avatar sobre o canudo do certificado para coletar seu diploma de conclusão.`,
    },
];
