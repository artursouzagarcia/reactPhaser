import React, { useState, useEffect } from 'react';

import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';

const PopupMontaPersonagem = ({ closePopUp }) => {
    return (
        <Container className="popup" id="popupMontaPersonagem" style={{ display: 'flex' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Monta personagem`}</span>
                </div>
                <div className="close" onClick={() => closePopUp()}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ color: '#fff' }}>
                            <h1>Montando Personagem.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopupMontaPersonagem;
