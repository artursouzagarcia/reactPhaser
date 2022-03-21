import styled from 'styled-components';
import { shade } from 'polished';
import theme from '../../../styles/themes/light';
export const Container = styled.div`
    display: flex;
    height: 100%;
    position: relative;
`;
export const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
        width: 100%;
        padding: 0px 25px;
    }

    > div {
        flex: 1;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* gap: 25px; */

        > form {
            margin: 25px 0px;
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            > div {
                width: 100%;
                margin: 10px 0px;
                display: flex;
                flex-direction: column;

                > input {
                    flex: 1;
                    padding: 10px 10px;
                    border-radius: 8px;
                    border: 1px solid #d9d9d9;
                }

                > span {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                > a {
                    color: ${theme.colors.text};

                    :hover {
                        color: ${theme.colors.text};
                    }
                }
            }
        }
    }
`;
