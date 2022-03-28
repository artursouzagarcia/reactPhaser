import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { MdArrowBack, MdOutlineMusicOff, MdOutlineMusicNote } from 'react-icons/md';
import { toast } from 'react-toastify';

import Game from '../../../game/index';
import ScorePlayer from '../../../store/scorePlayer';
import storeAmbienceSound from '../../../store/StoreAmbienceSound';
import storeCongratulations from '../../../store/StoreCongratulations';
import storePopUps from '../../../store/StorePopUps';
import storeJornada from '../../../store/StoreJornada';
import storeCasoClinico from '../../../store/StoreCasoClinico';
import storeToast from '../../../store/StoreToast';
import storeTooltip from '../../../store/StoreTooltip';
import { ContainerArrowBack } from './stylesGame';
import PopUpVideo from '../../../components/popUps/PopUpVideo';
import Sticker from '../../../game/assets/Sticker.png';
import selfie from '../../../game/assets/selfie.png';

import Moeda from '../../../game/assets/Moeda.gif';
import coin_156 from '../../../game/assets/coin_156.png';
import diamante_156 from '../../../game/assets/diamante_156.png';
import Diamante from '../../../game/assets/Diamante.gif';
import Diploma from '../../../game/assets/Diploma.png';
import elemento_menu from '../../../game/assets/elemento_menu.png';
import ToastGame from '../../../components/toastGame/ToastGame';

import aulasMOKE from '../../../store/mokeAula';
import PopUpPerguntasFase from '../../../components/popUps/PopUpPerguntasFase';
import PopUpPerguntaEnviada from '../../../components/popUps/popUpPerguntaEnviada';
import PopUpListPDFs from '../../../components/popUps/popUpListPDFs';
import graduation from '../../../components/animacoes/87227-graduation.gif';
import soundError from '../../../game/assets/soundfx/mixkit-click-error-1110.wav';
import soundAmbience from '../../../game/assets/soundfx/mixkit-forest-birds-ambience-1210.wav';
import soundClick from '../../../game/assets/soundfx/mixkit-gate-latch-click-1924.wav';
const clickAudio = new Audio(soundClick);
const ambienceAudio = new Audio(soundAmbience);
const errorAudio = new Audio(soundError);
const VOLUME_AMBIENCE = 0.02;
ambienceAudio.volume = VOLUME_AMBIENCE;
errorAudio.volume = 0.1;

export default observer(() => {
    const navegate = useNavigate();
    const [game, setGame] = useState(null);
    const [objJornada, setObjJornada] = useState(aulasMOKE);

    const jornadaSelecionada = useMemo(() => {
        if (!objJornada.length || !storeJornada.idAulaSelecionada) return null;

        return objJornada.find((jornada) => jornada.VideoId == storeJornada.idAulaSelecionada);
    }, [storeJornada.idAulaSelecionada]);

    const casoClinicoSelecionado = useMemo(() => {
        if (!objJornada.length || !storeCasoClinico.idAulaSelecionada) return null;

        return objJornada.find((jornada) => jornada.VideoId == storeCasoClinico.idAulaSelecionada);
    }, [storeCasoClinico.idAulaSelecionada]);

    useEffect(() => {
        if (!game) {
            setGame(new Game());

            playAmbienceAudio();
        }

        return () => ambienceAudio.pause();
    }, []);

    function toogleAmbienceAudioActive() {
        let newValue = !storeAmbienceSound.isPlaying;
        if (newValue) {
            storeAmbienceSound.play();
            ambienceAudio.volume = VOLUME_AMBIENCE;
            errorAudio.volume = VOLUME_AMBIENCE;
        } else {
            storeAmbienceSound.stop();
            ambienceAudio.volume = 0;
            errorAudio.volume = 0;
        }
        // setAmbienceAudioActive(newValue);
    }

    function playAmbienceAudio(params) {
        ambienceAudio.loop = true;
        ambienceAudio.play();
    }

    useEffect(() => {
        if (storeToast.aberto) {
            errorAudio.play();
            toast.info(<ToastGame title={storeToast.texto} text={storeToast.title} />, {
                // autoClose: 100000,
                icon: false,
            });
        }
    }, [storeToast.aberto]);

    useEffect(() => {
        // console.log('Moedas Incrementada', ScorePlayer.moedas);
    }, [ScorePlayer.moedas]);

    useEffect(() => {
        // console.log('Diamante Incrementad0', ScorePlayer.diamantes.length);
    }, [ScorePlayer.diamantes]);

    function closeGame() {
        game.destroy(true);
        setGame(null);
        navegate(-1);
    }

    return (
        <>
            <div className="containerMenu">
                <ContainerArrowBack>
                    <div title="Voltar" onClick={closeGame}>
                        <MdArrowBack />
                    </div>
                    <div title="Voltar" onClick={toogleAmbienceAudioActive}>
                        {storeAmbienceSound.isPlaying ? <MdOutlineMusicNote /> : <MdOutlineMusicOff />}
                    </div>
                </ContainerArrowBack>

                <div
                    className="containerAvatar"
                    style={{
                        background: '#ecbe2b',
                        borderRadius: '50%',
                        padding: '10px',
                        overflow: 'hidden',
                        border: '3px solid #d1605b',
                        marginRight: '20px',
                    }}
                >
                    <img className="avatar" src={selfie} style={{ height: '60px' }} />
                </div>
                <div className="containerMenuScore">
                    <div
                        onClick={() => {
                            playAmbienceAudio();
                            clickAudio.play();
                        }}
                        className="containerScore"
                        title="Quantidade de moedas que voce possui."
                        style={{ background: `url(${elemento_menu})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                    >
                        <img className="iconeScore" src={coin_156} />
                        <span className="valueScore" id="ValorMoedas">
                            {ScorePlayer.moedas}
                        </span>
                    </div>
                    <div
                        className="containerScore"
                        title="Quantidade de diamantes que voce possui."
                        style={{ background: `url(${elemento_menu})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                        onClick={() => {
                            storePopUps.openOnePopUp('listPDFs');
                            clickAudio.play();
                        }}
                    >
                        <img className="iconeScore" src={diamante_156} />
                        <span className="valueScore" id="ValorDiamantes">
                            {ScorePlayer.diamantes.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="containerProfessor" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                <div className="containerAvatar" style={{ position: 'relative' }}>
                    <img
                        className="avatar"
                        src={Sticker}
                        title="Alguma duvida?"
                        onClick={() => {
                            storePopUps.openOnePopUp('perguntaEnviada');
                            clickAudio.play();
                        }}
                    />
                    <span>{2}</span>
                </div>
            </div>

            {storePopUps.popups.perguntaEnviada && (
                <PopUpPerguntaEnviada closePopUp={() => storePopUps.closeAllPopUps()} pauseAmbiente={ambienceAudio} />
            )}

            {storePopUps.popups.listPDFs && (
                <PopUpListPDFs closePopUp={() => storePopUps.closeAllPopUps()} diamantesPegos={ScorePlayer.diamantes} />
            )}

            {jornadaSelecionada && storeJornada.popUpVideoAulaAberto && (
                <PopUpVideo objAulaSelecionada={jornadaSelecionada} pauseAmbiente={ambienceAudio} />
            )}

            {casoClinicoSelecionado && storeCasoClinico.popUpVideoAulaAberto && (
                <PopUpPerguntasFase
                    objAulaSelecionada={casoClinicoSelecionado}
                    popUpAulaPerguntasIsOpen={storeCasoClinico.popUpVideoAulaAberto}
                    closePopUpAulaFase={() => storeCasoClinico.fechaPopupVideo()}
                    casoClinico={true}
                    pauseAmbiente={ambienceAudio}
                />
            )}

            {storeCongratulations.popups.isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <GetCongratulations popUp={{ ...storeCongratulations.popups }} />
                </div>
            )}

            {storeTooltip.aberto && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '230px',
                        transform: calculatePosistionTolltip(storeTooltip.x, storeTooltip.y),
                        background: '#007bff ',
                        padding: '10px',
                        borderRadius: '3px',
                        color: '#fff',
                        fontSize: '14px',
                        display: 'flex',
                        animation: 'fadein 2s',
                        boxShadow: '2px 2px 10px #00000085',
                    }}
                >
                    <img src={Sticker} style={{ width: '60px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
                        <span style={{ fontWeight: 600 }}>{storeTooltip.title}</span>
                        <span>{storeTooltip.texto}</span>
                    </div>
                </div>
            )}
        </>
    );
});

function calculatePosistionTolltip(x, y) {
    const paddingX = 105;
    const paddingY = 130;
    let translateX = x - paddingX;
    let translateY = y - paddingY;

    if (translateX < 130) {
        translateX = 140;
    } else if (translateX > window.innerWidth - 300) {
        translateX = window.innerWidth - 320;
    }

    if (translateY < 80) {
        translateY = 80;
    } else if (translateY > window.innerHeight - 130) {
        translateY = window.innerHeight - 140;
    }

    return `translateX(${translateX}px) translateY(${translateY}px)`;
}

function GetCongratulations({ popUp }) {
    if (popUp.diamante)
        return (
            <div>
                <img src={diamante_156} />
                <h1>Parabéns, você ganhou diamante!</h1>
            </div>
        );

    if (popUp.moeda)
        return (
            <div>
                <img src={coin_156} />
                <h1>Parabéns, você ganhou uma moeda!</h1>
            </div>
        );

    // if (popUp.diploma) return <h1>Parabenss!</h1>;

    if (popUp.diploma)
        return (
            <div>
                <img src={Diploma} />
                <h1>Parabéns, você finalizou o curso!</h1>
            </div>
        );

    return <h1>Deu rruim</h1>;
}
