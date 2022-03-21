import styled from 'styled-components';
import imgBackground from '../../assets/background.jpg';
import theme from '../../styles/themes/light';

export const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
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
    > .ContainerBusca {
        align-items: center;
        justify-content: center;
        width: 100%;

        > div {
            position: relative;
            width: calc(100% - 50px);
            max-width: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            margin: auto;
        }

        > div > svg {
            position: absolute;
            left: 15px;
            color: #898989;
        }

        > div > input {
            width: 100%;
            padding: 15px;
            padding-left: 20px;
            border-radius: 8px;
            border: 1px solid #cecece;
            background-color: #e7e7e7;

            &:focus {
                border-color: rgba(176, 206, 255, 1);
                box-shadow: 0px 0px 2px 1px rgba(176, 206, 255, 1);
            }
        }
    }
`;

export const ContainerListGames = styled.div`
    display: flex;
    flex-direction: column;

    > .HeaderCarrocel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        > h2 {
            display: inline;
            margin: 0px;
        }
        > div {
            display: flex;
            justify-content: space-between;
            width: 40px;
            > span {
                font-size: 22px;
                font-weight: 800;
            }
        }
    }
`;

export const CardJornada = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    justify-content: center;
    overflow: hidden;

    :hover {
        > img {
            filter: saturate(0.3) brightness(0.2);
            transform: scale(1.2);
        }

        > .title-jornada-card {
            opacity: 1;
            transform: scale(1);
        }
    }

    > img {
        transition-duration: 0.5s;
    }

    > .title-jornada-card {
        opacity: 0;
        transition-duration: 0.5s;
        display: inline-block;
        position: absolute;
        /* height: 100px; */
        color: #fff;
        padding: 0px 15px;
        transform: scale(0.3);
        width: 100%;

        > h3 {
            margin: 0px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 20px;
        }
        > span {
            font-size: 12px;
            margin-bottom: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        > button {
            background-color: #059709;
            border: none;
            border-radius: 4px;
            color: #fff;
            padding: 8px;

            cursor: pointer;
        }
    }
`;
