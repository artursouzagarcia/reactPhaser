import React from 'react';

import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';
import testeImg from '../../assets/teste.png';

const PopUpHelp = ({ closePopUp }) => {
    return (
        <Container className="popup" id="popUpHelp" style={{ display: 'flex' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Ajuda`}</span>
                </div>
                <div className="close" onClick={() => closePopUp()}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, color: '#fff' }}>
                        <div>
                            <h2>Conhecendo seu ambiente virtual de aprendizado.</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                            <div style={{ height: '100%', flex: 1 }}>
                                <img src={testeImg} style={{ height: '100%', width: '100%' }} />
                            </div>
                            <div style={{ height: '100%', flex: 1 }}>
                                <span style={{}}>
                                    {`Bem vindo ao campus virtual universitário GAMMYX. Você está iniciando uma nova jornada de aprendizado com um conceito totalmente revolucionário. 

                                    Você irá seguir a {'{{JORNADA}}'} andando com seu avatar pelo campus virtual. 

                                    Cada aula em vídeo você pode acessar clicando nas placas indicativas ao longo do caminho. As placas com cadeado estão bloqueadas e só são liberadas caso você assista a aula anterior. Passando o mouse sobre as placas você tem uma descrição do conteúodo daquela aula.`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopUpHelp;
