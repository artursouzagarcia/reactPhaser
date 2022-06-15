import React from 'react';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';

const PopUpSatisfacao = ({ closePopUp }) => {
    const [value, setValue] = React.useState(2);
    const [indicaria, setIndicaria] = React.useState('false');

    const handleRadioChange = (event) => {
        setIndicaria(event.target.value);
    };
    return (
        <Container className="popup" id="PopUpSatisfacao" style={{ display: 'flex' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Pesquisa de Satisfação`}</span>
                </div>
                <div className="close" onClick={() => closePopUp()}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <h2>Sua opnião é muito importante para nós, por favor responda essa pesquisa rápida.</h2>
                        <span className="text">O que esta achando da sua jornada até aqui?</span>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <span className="text">Indicaria a jornada à um amigo?</span>
                        <div>
                            <RadioGroup
                                onChange={handleRadioChange}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Sim" />
                                <FormControlLabel value="false" control={<Radio />} label="Não" />
                            </RadioGroup>
                        </div>
                        <span className="text">Deixe um comentário:</span>
                        <textarea
                            style={{
                                backgroundColor: '#0d4860',
                                border: '0px solid',
                                color: '#fff',
                                fontSize: '16px',
                                borderRadius: '4px',
                                width: '100%',
                                flex: 1,
                                resize: 'none',
                            }}
                        ></textarea>
                        <div style={{ marginTop: '5px' }}>
                            <button
                                style={{
                                    padding: '16px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    background: '#1a8616',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => closePopUp()}
                            >
                                Enviar Avaliação
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopUpSatisfacao;
