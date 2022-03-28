import React, { useEffect, useMemo, useState } from 'react';
import imgClose from '../../assets/close.png';
import stiker from '../../game/assets/Sticker.png';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { Container } from './popUpStyles';
import VideoPlayer from '../videoPlayer/VideoPlayer';

const _alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

function PopUpPerguntasFase({
    popUpAulaPerguntasIsOpen,
    closePopUpAulaFase,
    objAulaSelecionada,
    storeCasoClinico,
    pauseAmbiente,
}) {
    const [aula, setAula] = useState({ ...objAulaSelecionada });
    const [vendoGabarito, setVendoGabarito] = useState(false);
    const [indexPerguntaVendo, setIndexPerguntaVendo] = useState(0);
    const [vendoVideo, setVendoVideo] = useState(false);

    const pergunta = useMemo(() => {
        if (!aula) return null;
        return aula.perguntas[indexPerguntaVendo];
    }, [indexPerguntaVendo, aula]);

    useEffect(() => {
        setAula({ ...objAulaSelecionada });
        setVendoGabarito(false);
        setIndexPerguntaVendo(0);
    }, [objAulaSelecionada]);

    function atualizaRespostaAula(indexPergunta, indexResposta) {
        let _aula = { ...aula };
        _aula.perguntas[indexPergunta].resposta = indexResposta;

        setAula(_aula);
    }

    function handleVerGabarito(params) {
        console.log(aula);
        setVendoGabarito(true);
    }

    return (
        <Container
            className="popup"
            id="popPerguntasUpFase"
            style={{ display: popUpAulaPerguntasIsOpen ? 'flex' : 'none', backgroundColor: '#ffffffc2' }}
        >
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">
                        {storeCasoClinico ? 'Caso Clínico' : `Exercícios da ${objAulaSelecionada.ordem}ª FASE`}
                    </span>
                </div>
                <div
                    className="close"
                    onClick={() => {
                        setVendoGabarito(false);
                        setVendoVideo(false);
                        return closePopUpAulaFase();
                    }}
                >
                    <img src={imgClose} />
                </div>

                {pergunta && (
                    <div className="conteudoPopUp">
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                color: '#fff',
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <h2 style={{ textAlign: 'center' }}>{pergunta?.pergunta}</h2>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        paddingRight: vendoGabarito ? '10px' : '0px',
                                    }}
                                >
                                    {pergunta.opcoes.map((opcao, indexOpcao) => (
                                        <div
                                            key={`${indexOpcao}-opcaoPergunta`}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                textAlign: 'start',
                                                marginBottom: '10px',
                                                alignItems: 'start',
                                                cursor: 'pointer',
                                                padding: '5px 10px',
                                                borderRadius: '8px',
                                                backgroundColor: (() => {
                                                    let cor = '';
                                                    if (indexOpcao != pergunta.resposta && indexOpcao != pergunta.gabarito)
                                                        return cor;
                                                    if (indexOpcao === pergunta.resposta) {
                                                        cor = '#fff';
                                                    }

                                                    if (vendoGabarito) {
                                                        if (indexOpcao === pergunta.resposta) {
                                                            if (pergunta.resposta === pergunta.gabarito) {
                                                                return '#2ea12a';
                                                            } else {
                                                                return 'red';
                                                            }
                                                        } else {
                                                            return '#2ea12a';
                                                        }
                                                    }
                                                    return cor;
                                                })(),
                                            }}
                                            onClick={() => atualizaRespostaAula(indexPerguntaVendo, indexOpcao)}
                                        >
                                            <span
                                                style={{
                                                    marginLeft: '10px',
                                                    fontSize: '16px',
                                                    textAlign: 'start',

                                                    fontWeight: 600,
                                                    // fontWeight:
                                                    //     pergunta.resposta === indexOpcao ||
                                                    //     (vendoGabarito && pergunta.gabarito == indexOpcao)
                                                    //         ? 600
                                                    //         : 400,
                                                    color: (() => {
                                                        let cor = '#fff';
                                                        if (indexOpcao != pergunta.resposta && indexOpcao != pergunta.gabarito)
                                                            return cor;
                                                        if (indexOpcao === pergunta.resposta) {
                                                            cor = '#000';
                                                        }

                                                        if (vendoGabarito) {
                                                            cor = '#fff';
                                                            // if (indexOpcao === pergunta.resposta) {
                                                            //     if (pergunta.resposta === pergunta.gabarito) {
                                                            //         return '#4bff44';
                                                            //     } else {
                                                            //         return 'red';
                                                            //     }
                                                            // } else {
                                                            //     return '#4bff44';
                                                            // }
                                                        }
                                                        return cor;
                                                    })(),
                                                }}
                                            >
                                                {`${_alfabeto[indexOpcao].toLocaleUpperCase()} - ${opcao}`}
                                            </span>
                                            {vendoGabarito &&
                                                indexOpcao === pergunta.resposta &&
                                                pergunta.resposta === pergunta.gabarito && (
                                                    <span style={{ marginTop: '10px', color: '#000', fontWeight: 600 }}>
                                                        Parabens, voce acertou!
                                                    </span>
                                                )}

                                            {vendoGabarito &&
                                                indexOpcao === pergunta.resposta &&
                                                pergunta.resposta !== pergunta.gabarito && (
                                                    <span style={{ marginTop: '10px', color: '#000', fontWeight: 600 }}>
                                                        Resposta errada, veja o video explicando o pq.
                                                    </span>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {vendoGabarito &&
                                (vendoVideo ? (
                                    <div style={{ flex: 1 }}>
                                        <VideoPlayer
                                            pauseAmbiente={pauseAmbiente}
                                            idVideo={pergunta.urlVideoGabarito.replace('https://watch.videodelivery.net/', '')}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ flex: 1 }}>
                                        <img src={stiker} style={{ height: '100px' }} />
                                        <h1>
                                            {pergunta.resposta == pergunta.gabarito
                                                ? `😔 Resposta Incorreta`
                                                : `🔥 Resposta Correta`}
                                        </h1>

                                        <button
                                            style={{
                                                padding: '10px',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                background: '#1a8616',
                                            }}
                                            onClick={() => setVendoVideo(true)}
                                        >
                                            Ver Gabarito
                                        </button>
                                    </div>
                                ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button style={styleBtn}>Voltar</button>
                            {vendoGabarito ? (
                                <button
                                    style={{ ...styleBtn, background: '#1a8616' }}
                                    onClick={() => {
                                        if (indexPerguntaVendo == aula.perguntas.length - 1) {
                                            setVendoGabarito(false);
                                            closePopUpAulaFase();
                                        }
                                        setVendoVideo(false);
                                        setIndexPerguntaVendo((old) => old + 1);
                                        setVendoGabarito(false);
                                    }}
                                >
                                    {indexPerguntaVendo == aula.perguntas.length - 1 ? 'Fechar' : 'Proximo Exercício'}
                                </button>
                            ) : (
                                <button style={{ ...styleBtn, background: '#1a8616' }} onClick={() => handleVerGabarito()}>
                                    Ver Gabarito
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default PopUpPerguntasFase;

const styleBtn = {
    padding: '10px 20px',
    background: '#fd2b2b',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '400',
    fontSize: '16px',
    letterSpacing: '1px',
    cursor: 'pointer',
};
