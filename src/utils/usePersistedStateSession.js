import React, { useState, useEffect } from 'react';

function usePersistedStateSession ( key, defaultValue ) {
    const [ state, setState ] = useState( defaultValue );

    useEffect( () => {
        sessionStorage.setItem( key, JSON.stringify( state ) );
    }, [ key, state ] );

    return [ state, setState ];
}

export default usePersistedStateSession;