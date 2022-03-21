
export function groupBy ( array, key ) {
    return array.reduce( ( result, obj ) => {
        ( result[ obj[ key ] ] = result[ obj[ key ] ] || [] ).push( obj );
        return result;
    }, {} );
};

export function getUnique ( array, key ) {
    return array.map( e => e[ key ] )
        .map( ( e, i, final ) => final.indexOf( e ) === i && i )
        .filter( ( e ) => array[ e ] ).map( e => array[ e ] );
}

export function shuffle ( array ) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while ( 0 !== currentIndex ) {

        // Pick a remaining element...
        randomIndex = Math.floor( Math.random() * currentIndex );
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[ currentIndex ];
        array[ currentIndex ] = array[ randomIndex ];
        array[ randomIndex ] = temporaryValue;
    }

    return array;
}