import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from './popUpStyles';
import imgClose from '../../assets/close.png';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import styled from 'styled-components';
import { BsArrowBarRight } from 'react-icons/bs';
import randomcolor from 'randomcolor';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

export const TextArea = styled.textarea`
    height: 100%;
    width: 100%;
    padding: 0;
    border-radius: 6px;
    background-color: #41414b;
    color: #fff;
    font-size: 16px;

    :focus {
        background-color: #070708;
        ::placeholder {
            color: #070708;
        }
    }

    ::placeholder {
        color: #fff;
        text-align: center;
        padding-top: 20px;
    }
`;

export const Mensagem = styled.div`
    padding: 5px 0px;
`;
export const ContainerScroll = styled.div`
    padding: 5px 0px;
`;

const listOfColors = randomcolor({
    count: 100,
    luminosity: 'bright',
    format: 'rgb', // e.g. 'rgb(225,200,20)'
});

const PopUpAuditorio = ({ closePopUp, pauseAmbiente }) => {
    const scrollToBottom = useScrollToBottom();
    const [chatAberto, setChatAberto] = useState(true);
    const meId = 1;
    const [mensagens, setMensagens] = useState(_mensagens);

    const refTextArea = useRef();

    const mensagensComCores = useMemo(() => {
        let listaDeUsuarios = {};

        mensagens.forEach((mensagem) => {
            listaDeUsuarios[mensagem.idUsuario] = { color: '' };
        });

        Object.keys(listaDeUsuarios).forEach((userId, index) => (listaDeUsuarios[userId] = { color: listOfColors[index] }));

        return mensagens.map((mensagem) => ({ ...mensagem, color: listaDeUsuarios[mensagem.idUsuario]?.color }));
    }, [mensagens]);

    useEffect(() => {
        console.log(mensagensComCores);
    }, [mensagensComCores]);

    return (
        <Container className="popup" id="popAuditorio" style={{ display: 'flex' }}>
            <div className="contentPopUp">
                <div className="TitlePopUp">
                    <span id="TitlePopUp">{`Auditório - Curso de obesidade`}</span>
                </div>
                <div className="close" onClick={() => closePopUp()}>
                    <img src={imgClose} />
                </div>
                <div className="conteudoPopUp">
                    {/* <h1>Auditório</h1> */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ flex: 1, position: 'relative' }}>
                            <VideoPlayer idVideo={'ec5e5f468b3b3f82ae75147374f56c0e'} pauseAmbiente={pauseAmbiente} />
                            {!chatAberto && (
                                <div
                                    onClick={() => setChatAberto(true)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: ' 5px',
                                        borderRadius: ' 5px',
                                        backgroundColor: ' rgb(53 53 60)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        borderBottom: '1px solid #494952',
                                        position: 'absolute',
                                        right: '30px',
                                        top: '30px',
                                        color: '#fff',
                                        transform: 'rotate(180deg)',
                                    }}
                                    title={`Abrir chat`}
                                >
                                    <BsArrowBarRight style={{ fontSize: 20 }} />
                                </div>
                            )}
                        </div>
                        {chatAberto && (
                            <div
                                style={{
                                    width: '300px',
                                    backgroundColor: '#18181b',
                                    color: '#fff',
                                    fontWeight: 600,
                                    padding: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div
                                    style={{
                                        padding: 10,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        onClick={() => setChatAberto(false)}
                                        style={{
                                            cursor: 'pointer',
                                            padding: ' 5px',
                                            borderRadius: ' 5px',
                                            backgroundColor: ' rgb(53 53 60)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            borderBottom: '1px solid #494952',
                                        }}
                                        title="Fechar chat"
                                    >
                                        <BsArrowBarRight style={{ fontSize: 20 }} />
                                    </div>
                                    <span style={{ flex: 1 }}>Chat da Transmissão</span>
                                </div>
                                <ContainerScroll style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                                    <ScrollToBottom className="customScroll">
                                        {mensagensComCores.map((mensagem) => (
                                            <Mensagem key={mensagem.id}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        // justifyContent: mensagem.idUsuario == meId ? 'flex-end' : 'flex-start',
                                                        textDecoration: mensagem.idUsuario == meId ? 'underline' : 'unset',
                                                        fontWeight: mensagem.idUsuario == meId ? 800 : 400,
                                                        color: mensagem.color,
                                                    }}
                                                >
                                                    <span>{`${mensagem.idUsuario == meId ? 'Eu' : mensagem.usuario}:`}</span>
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                        fontWeight: 300,
                                                    }}
                                                >
                                                    <span>{mensagem.mensagem}</span>
                                                </div>
                                            </Mensagem>
                                        ))}
                                    </ScrollToBottom>
                                </ContainerScroll>
                                <div style={{ height: 60, padding: '10px 0px' }}>
                                    <TextArea
                                        ref={refTextArea}
                                        placeholder="Escreva sua mensagem aqui!"
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                const mensagemEscrita = refTextArea.current.value;
                                                setMensagens((old) => [
                                                    ...old,
                                                    {
                                                        id: Math.random() * (99999 - 1) + 1,
                                                        idUsuario: 1,
                                                        usuario: 'Lucas',
                                                        mensagem: mensagemEscrita,
                                                        data: new Date(),
                                                    },
                                                ]);
                                                refTextArea.current.value = '';
                                            }
                                        }}
                                    ></TextArea>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PopUpAuditorio;

const _mensagens = [
    { id: 123, idUsuario: 0, usuario: 'Artur', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 12233, idUsuario: 1, usuario: 'Lucas', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 12443, idUsuario: 2, usuario: 'Matheus', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 15823, idUsuario: 1, usuario: 'Lucas', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 12963, idUsuario: 2, usuario: 'Matheus', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 865, idUsuario: 3, usuario: 'Carlos', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 234, idUsuario: 1, usuario: 'Lucas', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 745234234, idUsuario: 2, usuario: 'Matheus', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 68, idUsuario: 0, usuario: 'Artur', mensagem: 'Teste de mensagem', data: new Date() },
    { id: 2000087, idUsuario: 2, usuario: 'Matheus', mensagem: 'Teste de mensagem', data: new Date() },
];
