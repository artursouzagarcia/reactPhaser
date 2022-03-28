import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';
import VideoPlayer from '../videoPlayer/VideoPlayer';
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

const perguntasEnviadas = [
    {
        pergunta: 'Qual tipo de whey protein você recomenda pra esse uso pré-prandial?',
        url: 'https://watch.videodelivery.net/cd183cfd6c42cceb163961b9addf787a',
    },
    {
        pergunta: 'Dá pra fazer uso do Ozempic diário? O que você acha?',
        url: 'https://watch.videodelivery.net/e4517c4af7f5cb410b0ec625a28edf09',
    },
];

const PopUpPerguntaEnviada = ({ closePopUp, pauseAmbiente }) => {
    const [popUpPerguntasEnviadas, setPopUpPerguntasEnviadas] = useState({ isOpen: true, indexPergunta: 0 });
    const [mostraEnviaPergunta, setMostraEnviaPergunta] = useState(false);

    return (
        <Container
            className="popup"
            id="popUpPerguntaEnviada"
            style={{ display: popUpPerguntasEnviadas.isOpen ? 'flex' : 'none' }}
        >
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Perguntas do Usuários`}</span>
                </div>
                <div
                    className="close"
                    onClick={() => {
                        setPopUpPerguntasEnviadas({ isOpen: true, indexPergunta: 0 });
                        closePopUp();
                    }}
                >
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    {!mostraEnviaPergunta ? (
                        <div style={{ flex: 1, display: 'flex', position: 'relative', flexDirection: 'column' }}>
                            <h2 style={{ textAlign: 'center', color: '#fff', fontSize: '18px' }}>
                                {perguntasEnviadas[popUpPerguntasEnviadas.indexPergunta].pergunta}
                            </h2>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    {popUpPerguntasEnviadas.indexPergunta > 0 && (
                                        <MdKeyboardArrowLeft
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '60px',
                                                padding: '0px',
                                                background: '#fff',
                                                borderRadius: '50%',
                                                boxShadow: 'rgb(0 0 0 / 76%) 0px 0px 10px 1px',
                                                color: '#343434',
                                            }}
                                            onClick={() => {
                                                setPopUpPerguntasEnviadas((old) => ({
                                                    isOpen: true,
                                                    indexPergunta: old.indexPergunta - 1,
                                                }));
                                            }}
                                        />
                                    )}
                                </div>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    {popUpPerguntasEnviadas.isOpen && (
                                        <VideoPlayer
                                            pauseAmbiente={pauseAmbiente}
                                            idVideo={perguntasEnviadas[popUpPerguntasEnviadas.indexPergunta].url.replace(
                                                'https://watch.videodelivery.net/',
                                                '',
                                            )}
                                        />
                                    )}
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    {popUpPerguntasEnviadas.indexPergunta != perguntasEnviadas.length - 1 && (
                                        <MdKeyboardArrowRight
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '60px',
                                                padding: '0px',
                                                background: '#fff',
                                                borderRadius: '50%',
                                                boxShadow: 'rgb(0 0 0 / 76%) 0px 0px 10px 1px',
                                                color: '#343434',
                                            }}
                                            onClick={() => {
                                                setPopUpPerguntasEnviadas((old) => ({
                                                    isOpen: true,
                                                    indexPergunta: old.indexPergunta + 1,
                                                }));
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <span style={{ color: '#fff' }}>Envie sua pergunta</span>
                            <div style={{ margin: '10px 0px', flex: 1 }}>
                                <textarea style={{ width: '100%', height: '100%' }}></textarea>
                            </div>

                            <button
                                style={{ ...styleBtn, background: '#1a8616', textAlign: 'right' }}
                                onClick={() => setMostraEnviaPergunta(false)}
                            >
                                Enviar Pergunta
                            </button>
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {!mostraEnviaPergunta && (
                            <button style={{ ...styleBtn, background: '#1a8616' }} onClick={() => setMostraEnviaPergunta(true)}>
                                Enviar Pergunta
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopUpPerguntaEnviada;
