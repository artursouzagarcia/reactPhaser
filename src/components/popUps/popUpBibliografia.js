import React from 'react';

import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';
const PopUpBibliografia = ({ closePopUp }) => {
    return (
        <Container className="popup" id="popUpBibliografia" style={{ display: 'flex' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Bibliografia da Jornada`}</span>
                </div>
                <div className="close" onClick={() => closePopUp()}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ color: '#fff' }}>
                            <h1>Ainda não há bibliografia cadastrada para esta jornada.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopUpBibliografia;
