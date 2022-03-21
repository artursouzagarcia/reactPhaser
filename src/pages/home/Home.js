import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

import { Container, ContainerListGames, CardJornada } from './stylesHome';
import { MdSearch } from 'react-icons/md';
import api from '../../service/api';

function Home() {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('api/docflix/getseries')
            .then(({ data }) => {
                setCursos(data.Videos);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <div className="ContainerBusca">
                <div>
                    <MdSearch />
                    <input placeholder="Persquisar por jornadas" />
                </div>
            </div>
            <ContainerListGames>
                <div className="HeaderCarrocel">
                    <h2>Minhas Jornadas</h2>
                </div>
                <div className="ContainerCarrocel">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={9000000}
                        autoPlay={false}
                        centerMode={false}
                        className=""
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={responsive}
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {cursos.map((curso, index) => {
                            return (
                                <CardJornada key={`visto-${curso.VideoId}`}>
                                    <img src={curso.Picture} />
                                    <div className="title-jornada-card">
                                        <h3>{curso.Title}</h3>
                                        <span>{curso.Description}</span>
                                        <button onClick={() => navigate(`/apresentacao/${curso.VideoId}`)}>
                                            Retornar Jornada
                                        </button>
                                    </div>
                                </CardJornada>
                            );
                        })}
                    </Carousel>
                </div>
                <div className="HeaderCarrocel">
                    <h2>Todas Jornadas</h2>
                </div>
                <div className="ContainerCarrocel">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={9000000}
                        autoPlay={false}
                        centerMode={false}
                        className=""
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={responsive}
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {cursos.map((curso, index) => {
                            return (
                                <CardJornada key={`Nvisto-${curso.VideoId}`}>
                                    <img src={curso.Picture} />
                                    <div className="title-jornada-card">
                                        <h3>{curso.Title}</h3>
                                        <span>{curso.Description}</span>
                                        <button onClick={() => navigate(`/apresentacao/${curso.VideoId}`)}>
                                            Começar Jornada
                                        </button>
                                    </div>
                                </CardJornada>
                            );
                        })}
                    </Carousel>
                </div>
            </ContainerListGames>
        </Container>
    );
}

export default Home;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        // partialVisibilityGutter: 40,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        // partialVisibilityGutter: 40,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        // partialVisibilityGutter: 30,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        // partialVisibilityGutter: 30,
    },
};
