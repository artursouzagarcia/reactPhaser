import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';
import imgDiamante from '../../game/assets/diamante.png';

const PopUpListPDFs = ({ closePopUp, diamantesPegos }) => {
    const [mostraPopUpListaPDFs, setMostraPopUpListaPDFs] = useState({ isOpen: true, indexPergunta: 0 });
    const [pdfSelecionado, setPdfSelecionado] = useState('');

    return (
        <Container className="popup" id="popUpListPDFs" style={{ display: mostraPopUpListaPDFs ? 'flex' : 'none' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Seus diamantes`}</span>
                </div>
                <div className="close" onClick={() => (pdfSelecionado ? setPdfSelecionado('') : closePopUp())}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    {pdfSelecionado ? (
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                            <iframe
                                style={{ border: 'none' }}
                                id="pdf"
                                data=""
                                type="application/pdf"
                                width="100%"
                                height="100%"
                                src={pdfSelecionado}
                            />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {diamantesPegos.length ? (
                                diamantesPegos.map((diamante) => {
                                    return (
                                        <div
                                            style={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                                            onClick={() => {
                                                // closePopUp(false);
                                                setPdfSelecionado(diamante);
                                            }}
                                        >
                                            <button
                                                style={{
                                                    background: '#2dae32',
                                                    color: '#fff',
                                                    marginRight: '10px',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '0px 10px',
                                                    height: '40px',
                                                }}
                                            >
                                                Abrir Diamante
                                            </button>
                                            <div style={{ width: '50px' }}>
                                                <img style={{ width: '100%' }} src={imgDiamante} />
                                            </div>
                                            <span style={{ fontSize: '20px', color: '#fff', lineHeight: '50px' }}>
                                                {diamante.descricao}
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ color: '#fff' }}>
                                    <h1>😔 Poxa, você ainda não possui diamantes.</h1>
                                    <h3 style={{ fontWeight: 400 }}>
                                        Que tal assistir algumas aulas? Basta clicar nas bandeiras.
                                    </h3>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default PopUpListPDFs;
