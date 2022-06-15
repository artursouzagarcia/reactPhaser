import styled from 'styled-components';

export const ContainerArrowBack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0px 10px;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 7px;
        border-radius: 50%;
        background-color: #ffffff9e;
        cursor: pointer;
        transition-duration: 0.3s;
    }

    > div:hover {
        transform: scale(1.1);
    }

    > div > svg {
        font-size: 20px;
    }
`;
