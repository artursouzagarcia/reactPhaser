import React, { useState, useEffect } from 'react';

function usePersistedState ( key, defaultValue ) {
    const [ state, setState ] = useState( defaultValue );

    useEffect( () => {
        localStorage.setItem( key, JSON.stringify( state ) );
    }, [ key, state ] );

    return [ state, setState ];
}

export default usePersistedState;