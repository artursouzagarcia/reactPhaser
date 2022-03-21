import React, { useRef } from 'react';
import { Stream } from '@cloudflare/stream-react';
import { Container } from './stylesVideoPlayer';

function VideoPlayer({ idVideo }) {
    const referenciaDoPlayer = useRef();
    const urlEditada = `https://videodelivery.net/${idVideo}/manifest/video.mpd?clientBandwidthHint=1.8`;
    return (
        <Container>
            <Stream
                primaryColor="#0091de"
                src={idVideo}
                streamRef={referenciaDoPlayer}
                controls
                responsive={true}
                autoplay={true}
                onEnded={() => {}}
            />
        </Container>
    );
}

export default VideoPlayer;
