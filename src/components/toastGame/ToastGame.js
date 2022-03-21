import React from 'react';
import Sticker from '../../game/assets/Sticker.png';
function ToastGame({ title, text }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src={Sticker} style={{ width: '70px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <span style={{ fontWeight: '600', textAlign: 'start', color: '#fff' }}>{title}</span>

                    <span style={{ color: '#fff' }}>{text}</span>
                </div>
            </div>
        </div>
    );
}

export default ToastGame;
