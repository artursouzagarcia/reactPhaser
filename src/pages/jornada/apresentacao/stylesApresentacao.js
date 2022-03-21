import styled from 'styled-components';
import imgBackground from '../../../assets/background.jpg';

export const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;

    /* :before {
        overflow: hidden;
        background: url(${imgBackground}) center center / cover no-repeat fixed;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: -1;
        filter: brightness(0.9) blur(49px) opacity(0.4);
    } */

    > .ContainerPhoto {
        flex: 1;
        overflow: hidden;
        position: fixed;
        z-index: -1;

        > img {
            width: 100%;
        }
    }
`;

export const ContainerBody = styled.div`
    margin-top: 30vh;
    position: relative;
    display: flex;
    flex-direction: column;

    :before {
        overflow: hidden;
        background: url(${imgBackground}) center center / cover no-repeat fixed;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: -1;
        filter: brightness(0.9) blur(49px) opacity(0.4);
    }
`;
