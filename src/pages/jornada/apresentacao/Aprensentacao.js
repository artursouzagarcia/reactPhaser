import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../service/api';

import { Container, ContainerBody } from './stylesApresentacao';

function Apresentacao() {
    const navegate = useNavigate();
    const params = useParams();
    const [jornada, setJornada] = useState(null);

    useEffect(() => {
        api.get(`api/docflix/GetVideo?VideoId=${params.idJornada}`)
            .then(({ data }) => {
                console.log('Jornada selecionada', data);
                setJornada(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params]);

    return jornada ? (
        <Container>
            <div className="ContainerPhoto">
                <img src={jornada.Picture} />
            </div>
            <ContainerBody className="ContainerBody">
                <h1>{jornada.Title}</h1>
                <span>{jornada.ReleaseDate}</span>
                <h3>{jornada.Description}</h3>
                <button onClick={() => navegate(`/game/${params.idJornada}`)}>Começar Jornada</button>
            </ContainerBody>
        </Container>
    ) : (
        <Container>
            <h1>Carregando....</h1>
        </Container>
    );
}

export default Apresentacao;
