import styled from 'styled-components';
import { lighten, shade } from 'polished';

const secundColor = '#0d4860';
const backgrondColor = '#21abe3';
const textBody = '#093446';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffffc2;

    > .contentPopUp {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: 1000px;
        height: 630px;
        max-height: calc(100vh - 110px);
        max-width: calc(100vw - 50px);
        background-color: ${backgrondColor};
        border-radius: 20px;
        border: 4px solid ${secundColor};
    }

    > .contentPopUp > .TitlePopUp {
        padding: 5px;
        font-size: 20px;
        background-color: ${secundColor};
    }

    > .contentPopUp > .close {
        position: absolute;
        top: 6px;
        right: 6px;
        /* width: 20px; */
        height: 30px;
        cursor: pointer;
        z-index: 10;
    }
    > .contentPopUp > .close > img {
        height: 100%;
    }

    > .contentPopUp > .TitlePopUp > span {
        padding: 0 40px;
        line-height: 35px;
        color: #fff;
        font-weight: 600;
        font-size: 22px;
    }

    > .contentPopUp > .conteudoPopUp {
        padding: 10px;
        padding-top: 0px;
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: overlay;
    }

    /* width */
    > .contentPopUp > .conteudoPopUp ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    > .contentPopUp > .conteudoPopUp ::-webkit-scrollbar-track {
        background: ${lighten(0.1, backgrondColor)};
        border-radius: 5px;
    }

    /* Handle */
    > .contentPopUp > .conteudoPopUp ::-webkit-scrollbar-thumb {
        background: ${secundColor};
        border-radius: 5px;
    }

    /* Handle on hover */
    > .contentPopUp > .conteudoPopUp ::-webkit-scrollbar-thumb:hover {
        background: ${shade(0.5, secundColor)};
    }

    > .contentPopUp > .conteudoPopUp > .video {
        position: relative;
        flex: 1;
    }

    > .contentPopUp > .conteudoPopUp > div > div > h2 {
        color: ${textBody};
        font-size: 20px;
        font-weight: 600;
    }
    > .contentPopUp > .conteudoPopUp > h3 {
        margin-bottom: 10px;
        margin-top: 20px;
        color: #fff;
        text-align: center;
        font-size: 22px;
        color: ${textBody};
    }

    > .contentPopUp > .conteudoPopUp > h4 {
        margin: 0px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        font-weight: 400;
    }

    > .contentPopUp > .conteudoPopUp > span {
        color: #fff;
        text-align: center;
        margin-top: 10px;
    }
    > .contentPopUp > .conteudoPopUp > div > .text {
        color: #fff;
        text-align: center;
        margin: 5px;
        font-weight: 600;
    }
`;
