import React, { useState } from 'react';
import { toast } from 'react-toastify';
import imgClose from '../../assets/close.png';
import { Container } from './popUpStyles';
import storeJornada from '../../store/StoreJornada';
import PopUpPerguntasFase from './PopUpPerguntasFase';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import stikerMedico from '../../game/assets/Sticker.png';

function PopUpVideo({ objAulaSelecionada }) {
    const [popUpAulaPerguntasIsOpen, setPopUpAulaPerguntasIsOpen] = useState(false);

    function closePopUpVideo(params) {
        if (objAulaSelecionada.perguntas.length) {
            setPopUpAulaPerguntasIsOpen(true);
        } else {
            toast.info(<ToastMudaVideo nomeVideo={`Aula ${objAulaSelecionada.ordem + 1} liberada!`} />, {
                // autoClose: 100000,
                icon: false,
                backgroundColor: 'crimson',
            });
            storeJornada.toggglePopUpVideoAulaAberto();
        }
    }

    function closePopUpAulaFase() {
        toast.info(<ToastMudaVideo nomeVideo={`Aula ${objAulaSelecionada.ordem + 1} liberada!`} />, {
            // autoClose: 100000,
            icon: false,
            backgroundColor: 'crimson',
        });
        setPopUpAulaPerguntasIsOpen(false);
        storeJornada.toggglePopUpVideoAulaAberto();

        // if (objAulaSelecionada.diamantes && !objAulaSelecionada.diamantes.pego) {
        //     setPopUpUsuario({ isOpen: true, text: ' 👀 Olha, um diamente!' });
        //     if (objAulaSelecionada.casoClinico && !objAulaSelecionada.casoClinico.desbloqueado)
        //         return setAulas(
        //             atualizaAulas({
        //                 ...objAulaSelecionada,
        //                 casoClinico: { ...objAulaSelecionada.casoClinico, desbloqueado: true },
        //                 diamantes: { ...objAulaSelecionada.diamantes, visivel: true },
        //             }),
        //         );
        //     return setAulas(
        //         atualizaAulas({ ...objAulaSelecionada, diamantes: { ...objAulaSelecionada.diamantes, visivel: true } }),
        //     );
        // }
    }

    return popUpAulaPerguntasIsOpen ? (
        <PopUpPerguntasFase
            popUpAulaPerguntasIsOpen={popUpAulaPerguntasIsOpen}
            closePopUpAulaFase={closePopUpAulaFase}
            objAulaSelecionada={objAulaSelecionada}
        />
    ) : (
        <Container className="popup" id="popUpFase" style={{ display: 'flex', backgroudColor: '#ffffffc2' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`${objAulaSelecionada.ordem}ª FASE`}</span>
                </div>
                <div className="close" onClick={closePopUpVideo}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    <div className="video">
                        <VideoPlayer idVideo={objAulaSelecionada.URL.replace('https://watch.videodelivery.net/', '')} />
                    </div>
                    <h3 id="titleVideoPopUp">{objAulaSelecionada.Title}</h3>
                    {/* <h4 id="autorVideoPopUp">{objAulaSelecionada.Author}</h4> */}
                    {/* <span id="descricaoVideoPopUp">{objAulaSelecionada.Description}</span> */}
                </div>
            </div>
        </Container>
    );
}

export default PopUpVideo;

function ToastMudaVideo({ nomeVideo, closeToast }) {
    function handle() {
        closeToast();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src={stikerMedico} style={{ width: '70px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <span style={{ fontWeight: '600', textAlign: 'center', color: '#fff' }}>{nomeVideo}</span>

                    <span style={{ color: '#fff' }}>🔥 Parabéns!!!</span>
                </div>
            </div>
        </div>
    );
}
