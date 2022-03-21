import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';

import Game from '../../../game/index';
import ScorePlayer from '../../../store/scorePlayer';
import storeJornada from '../../../store/StoreJornada';
import storeToast from '../../../store/StoreToast';
import storeTooltip from '../../../store/StoreTooltip';
import { ContainerArrowBack } from './stylesGame';
import PopUpVideo from '../../../components/popUps/PopUpVideo';
import Sticker from '../../../game/assets/Sticker.png';
import Moeda from '../../../game/assets/Moeda.gif';
import Diamante from '../../../game/assets/Diamante.gif';
import elemento_menu from '../../../game/assets/elemento_menu.png';
import ToastGame from '../../../components/toastGame/ToastGame';

import aulasMOKE from '../../../store/mokeAula';

export default observer(() => {
    const navegate = useNavigate();
    const [game, setGame] = useState(null);
    const [objJornada, setObjJornada] = useState(aulasMOKE);
    const [mostraTooltipBandeira, setMostraTooltipBandeira] = useState(true);

    const jornadaSelecionada = useMemo(() => {
        if (!objJornada.length || !storeJornada.idAulaSelecionada) return null;

        return objJornada.find((jornada) => jornada.VideoId == storeJornada.idAulaSelecionada);
    }, [storeJornada.idAulaSelecionada]);

    useEffect(() => {
        if (!game) {
            setGame(new Game());
        }
    }, []);

    useEffect(() => {
        if (storeToast.aberto) {
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
                </ContainerArrowBack>

                <div className="containerAvatar">
                    <img className="avatar" src={Sticker} />
                </div>
                <div className="containerMenuScore">
                    <div
                        className="containerScore"
                        title="Quantidade de moedas que voce possui."
                        style={{ background: `url(${elemento_menu})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                    >
                        <img className="iconeScore" src={Moeda} />
                        <span className="valueScore" id="ValorMoedas">
                            {ScorePlayer.moedas}
                        </span>
                    </div>
                    <div
                        className="containerScore"
                        title="Quantidade de diamantes que voce possui."
                        style={{ background: `url(${elemento_menu})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                    >
                        <img className="iconeScore" src={Diamante} />
                        <span className="valueScore" id="ValorDiamantes">
                            {ScorePlayer.diamantes.length}
                        </span>
                    </div>
                </div>
            </div>
            {jornadaSelecionada && storeJornada.popUpVideoAulaAberto && <PopUpVideo objAulaSelecionada={jornadaSelecionada} />}
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
