import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center;

    > .contentPopUp {
        position: relative;
        /* width: 80vw;
            height: calc(80vw/1.7); */
        width: 1000px;
        height: 630px;
        max-height: calc(100vh - 110px);
        background-color: #0091de;
        border-radius: 20px;
        border-top-left-radius: 0px;
        border: 4px solid black;
        padding: 15px;
    }

    > .contentPopUp > .TitlePopUp {
        position: absolute;
        top: -34px;
        left: -4px;
        background-color: #0091de;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-top: 4px solid black;
        border-left: 4px solid black;
        border-right: 4px solid black;
        display: inline-block;
        height: 35px;
    }

    > .contentPopUp > .close {
        position: absolute;
        top: -32px;
        right: -32px;
        width: 64px;
        height: 64px;
        cursor: pointer;
        z-index: 10;
    }

    > .contentPopUp > .TitlePopUp > span {
        padding: 0 40px;
        line-height: 35px;
        color: #fff;
        font-weight: 600;
        font-size: 25px;
    }

    > .contentPopUp > .conteudoPopUp {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    > .contentPopUp > .conteudoPopUp > .video {
        position: relative;
        flex: 1;
    }

    > .contentPopUp > .conteudoPopUp > h3 {
        margin-bottom: 10px;
        margin-top: 20px;
        color: #fff;
        text-align: center;
        font-size: 30px;
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
`;
