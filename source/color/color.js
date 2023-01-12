/* -------------------------------------------------------------------------------------------- */
import { createSignal } from "solid-js";
import { hexToRgb, hexToHsl, rgbToHex, rgbToHsl, hslToHex, hslToRgb } from "./convertor";
import { equal } from "../math/equal";

/* -------------------------------------------------------------------------------------------- */
const [ getGlobalColor, setGlobalColor ] = createSignal( {
    hex: [ 0, 0, 0, 255 ],
    rgb: hexToRgb( [ 0, 0, 0, 255 ] ),
    hsl: hexToHsl( [ 0, 0, 0, 255 ] ),
} );

const getGlobalHex = _ => [ ... getGlobalColor().hex ];
const getGlobalRgb = _ => [ ... getGlobalColor().rgb ];
const getGlobalHsl = _ => [ ... getGlobalColor().hsl ];

const setGlobalHex = hex => {

    /*  */
    let prev;

    prev = getGlobalHex();
    next = [ ... hex ];

    /*  */
    for ( let i = 0; i < prev.length; i ++ ) {

        if ( equal( prev[ i ], next[ i ] ) ) continue;

        setGlobalColor( { hex: next, rgb: hexToRgb( next ), hsl: hexToHsl( next ) } );

        return;

    }

};
const setGlobalRgb = rgb => {

    /*  */
    let prev;

    prev = getGlobalRgb();
    next = [ ... rgb ];

    /*  */
    for ( let i = 0; i < prev.length; i ++ ) {

        if ( equal( prev[ i ], next[ i ] ) ) continue;

        setGlobalColor( { hex: rgbToHex( next ), rgb: next, hsl: rgbToHsl( next ) } );

        return;

    }

};
const setGlobalHsl = hsl => {

    /*  */
    let prev;

    prev = getGlobalHsl();
    next = [ ... hsl ];

    /*  */
    for ( let i = 0; i < prev.length; i ++ ) {

        if ( equal( prev[ i ], next[ i ] ) ) continue;

        setGlobalColor( { hex: hslToHex( next ), rgb: hslToRgb( next ), hsl: next } );

        return;

    }

};

/* -------------------------------------------------------------------------------------------- */
export { getGlobalHex, getGlobalRgb, getGlobalHsl, setGlobalHex, setGlobalRgb, setGlobalHsl };
