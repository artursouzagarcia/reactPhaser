import styled from 'styled-components';
import { shade } from 'polished';

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 20px;
    border-radius: 5px;
    border: 0;
    background-color: ${(props) => (props.backgroundColorProps ? props.backgroundColorProps : props.theme.colors.primary)};
    color: ${(props) => (props.colorProps ? props.colorProps : '#fff')};
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    margin-right: 5px;
    transition-duration: 0.3s;

    :hover {
        background-color: ${(props) =>
            props.hoverBackgroundColorProps ? props.hoverBackgroundColorProps : shade(0.25, props.theme.colors.primary)};
        transform: scale(0.95);
    }

    > i {
        font-size: 1.3rem;
        margin-right: 10px;
    }

    > span {
        margin: auto;
    }

    :disabled {
        background: #757575;

        :hover {
            cursor: default;
            transform: scale(1);
        }
    }
`;

export const ButtonTrue = styled.button`
    display: flex;
    align-items: center;
    justify-content: ace-betweensp;
    padding: 10px 20px;
    //border-radius: 4px;
    border: 0;
    background: #626263;
    color: white;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: #3c3c3c;
    }
    > i {
        font-size: 1.3rem;
        margin-right: 10px;
    }
    > span {
        margin: auto;
    }
`;

export const IconButton = styled.button`
    display: 'inline-block';
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin-left: 5px;

    > div {
        font-size: ${(props) => props.configIconButton.fontSize || '20px'};
        color: ${(props) => props.configIconButton.iconColor || '#a1a1a1'};
    }

    > div > span {
        margin-left: 5px;
    }

    &:hover {
        > div {
            color: #00515e;
        }
        > div > span {
            color: #00515e;
        }
    }
`;

export const ErrorLabel = styled.label`
    margin: 0 !important;
    color: red;
    font-style: italic;
    font-size: 12px;
`;

export const Title = styled.h1`
    color: #626263;
    font-size: 1.5rem;
`;

export const Span = styled.span`
    padding: 0 5px;
    font-size: 14px;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
`;

export const Input = styled.input`
    margin: 5px 0;
    height: 38px;
    border-radius: 4px;
    border: 1px solid ${(props) => (props.className == 'error' ? 'red' : '#d9d9d9')};
    padding: 0 10px;
    margin: 5px 5px;
    width: 100%;

    &:focus {
        border-color: ${(props) => (props.className == 'error' ? 'red' : 'rgba(176, 206, 255, 1)')};
        box-shadow: 0px 0px 2px 1px ${(props) => (props.className == 'error' ? 'red' : 'rgba(176, 206, 255, 1)')};
    }
`;

export const TextArea = styled.textarea`
    margin: 5px 0;
    height: 80px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 5px 0;
    font-size: 14px;
    width: 100%;
`;

export const Select = styled.select`
    margin: 5px 0;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #00000000;
    padding: 0 10px;
    margin: 5px 5px;
    font-size: 14px;
    width: 100%;
`;

export const InputCheck = styled.label`
    display: block;
    position: relative;
    padding-left: 13px;
    /* margin-bottom: 12px; */

    cursor: pointer;
    font-size: 12px;

    > label {
        cursor: pointer;
        vertical-align: sub;

        > a {
            color: ${(p) => p.theme.colors.primary};
        }
    }

    > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    > span {
        position: absolute;
        top: 0px;
        left: 5px;
        height: 15px;
        width: 16px;
        background-color: #cecece;
    }

    > input:checked ~ span {
        background-color: ${(p) => p.theme.colors.primary};
    }

    > span:after {
        content: '';
        position: absolute;
        display: none;

        left: 4px;
        top: 0px;
        width: 5px;
        border-radius: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    > input:checked ~ span:after {
        display: block;
    }
`;

export const InputRadio = styled.label`
    display: block;
    position: relative;
    padding-left: 20px;
    margin: 0px 20px 12px 5px;

    cursor: pointer;
    font-size: 14px;
    user-select: none;

    > label {
        cursor: pointer;
        vertical-align: text-bottom;
    }

    > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    > input:checked ~ span {
        background-color: ${(p) => p.theme.colors.primary};
    }

    > span {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: ${(p) => (p.theme.title === 'light' ? '#c7c7c7' : '#fff')};
        border-radius: 50%;
    }

    > span:after {
        content: '';
        position: absolute;
        display: none;
    }

    > input:checked ~ span:after {
        display: block;
    }

    > span:after {
        top: 5px;
        left: 5px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: white;
        background-color: #fff;
    }
`;

export const Header = styled.h3`
    color: #00515e;
    margin: 15px 0px;
    border-bottom: 1px solid;
`;

export const Group = styled.div`
    padding: 0px 10px;
`;

export const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
`;

export const ContainerLine = styled.div`
    margin: 5px 0px;
    display: flex;
    flex-direction: column;
`;

export const GroupInLine = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 10px;
        display: flex;
        flex-direction: column;
    }
`;

export const SpanErrorForm = styled.span`
    color: rgb(235, 54, 54);
    margin-left: 15px;
    font-size: 12px;
    font-weight: 600;
`;
