import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const Spinner = () => {
    const { colors } = useContext( ThemeContext );
    return (
        <div
            style={ {
                display: 'block',
                position: 'fixed',
                right: 15,
                top: 15,
                zIndex: 1031,
            } }
        >
            <div
                style={ {
                    animation: '400ms linear infinite spinner',
                    borderBottom: '2px solid transparent',
                    borderLeft: `2px solid ${ colors.primary }`,
                    borderRadius: '50%',
                    borderRight: '2px solid transparent',
                    borderTop: `2px solid ${ colors.primary }`,
                    boxSizing: 'border-box',
                    height: 18,
                    width: 18,
                } }
            />
        </div>
    );
};


export default Spinner;