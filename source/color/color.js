/* -------------------------------------------------------------------------------------------- */
import { createSignal } from "solid-js";
import { hexToRgb, hexToHsl, rgbToHex, rgbToHsl, hslToHex, hslToRgb } from "./convertor";
import { equal } from "../math/equal";

/* -------------------------------------------------------------------------------------------- */
const initial_hex = [ 4, 10, 103, 255 ];
const initial_rgb = hexToRgb( initial_hex );
const initial_hsl = hexToHsl( initial_hex );

const [ getGlobalColor, setGlobalColor ] = createSignal( { hex: initial_hex, rgb: initial_rgb, hsl: initial_hsl } );

const getGlobalHex = _ => [ ... getGlobalColor().hex ];
const getGlobalRgb = _ => [ ... getGlobalColor().rgb ];
const getGlobalHsl = _ => [ ... getGlobalColor().hsl ];

const setGlobalHex = hex => {

    /*  */
    const prev = getGlobalHex();
    const next = [ ... hex ];

    /*  */
    for ( let i = 0; i < prev.length; i ++ ) {

        if ( equal( prev[ i ], next[ i ] ) ) continue;

        setGlobalColor( { hex: next, rgb: hexToRgb( next ), hsl: hexToHsl( next ) } );

        return;

    }

};
const setGlobalRgb = rgb => {

    /*  */
    const prev = getGlobalRgb();
    const next = [ ... rgb ];

    /*  */
    for ( let i = 0; i < prev.length; i ++ ) {

        if ( equal( prev[ i ], next[ i ] ) ) continue;

        setGlobalColor( { hex: rgbToHex( next ), rgb: next, hsl: rgbToHsl( next ) } );

        return;

    }

};
const setGlobalHsl = hsl => {

    /*  */
    const prev = getGlobalHsl();
    const next = [ ... hsl ];

    /*  */
    for ( let i = 0; i < prev.length; i ++ ) {

        if ( equal( prev[ i ], next[ i ] ) ) continue;

        setGlobalColor( { hex: hslToHex( next ), rgb: hslToRgb( next ), hsl: next } );

        return;

    }

};

/* -------------------------------------------------------------------------------------------- */
export { getGlobalHex, getGlobalRgb, getGlobalHsl, setGlobalHex, setGlobalRgb, setGlobalHsl };
