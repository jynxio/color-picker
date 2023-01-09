/**
 *
 */
import { createContext, createSignal } from "solid-js";

import { hexToRgb, hexToHsl, rgbToHex, rgbToHsl, hslToHex, hslToRgb } from "../helper/colorFormatConvertor";

/**
 *
 */
const initial_hex = [ 0, 0, 0, 255 ];
const initial_rgb = hexToRgb( initial_hex );
const initial_hsl = hexToHsl( initial_hex );

const [ getColor, setColor ] = createSignal( {
    hex: initial_hex,
    rgb: initial_rgb,
    hsl: initial_hsl,
} );

const getHex = _ => [ ... getColor().hex ];
const getRgb = _ => [ ... getColor().rgb ];
const getHsl = _ => [ ... getColor().hsl ];

const setHex = hex => {

    hex = [ ... hex ];

    const rgb = hexToRgb( hex );
    const hsl = hexToHsl( hex );

    setColor( { hex, rgb, hsl } );

};
const setRgb = rgb => {

    rgb = [ ... rgb ];

    const hex = rgbToHex( rgb );
    const hsl = rgbToHsl( rgb );

    setColor( { hex, rgb, hsl } );

};
const setHsl = hsl => {

    hsl = [ ... hsl ];

    const hex = hslToHex( hsl );
    const rgb = hslToRgb( hsl );

    setColor( { hex, rgb, hsl } );

};

const GlobalColorContext = createContext( { getHex, getRgb, getHsl, setHex, setRgb, setHsl } );

// TODO 其实直接export{ getHex, getRgb, getHsl, setHex, setRgb, setHsl } 就行了...不需要使用context

/**
 *
 */
export { GlobalColorContext };
