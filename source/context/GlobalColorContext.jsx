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

const GlobalColorContext = createContext( { getHex, getRgb, getHsl, setHex, setRgb, setHsl } );

function getHex () { return getColor().hex }
function getRgb () { return getColor().rgb }
function getHsl () { return getColor().hsl }

function setHex ( hex ) {

    const rgb = hexToRgb( hex );
    const hsl = hexToHsl( hex );

    setColor( { hex, rgb, hsl } );

}
function setRgb ( rgb ) {

    const hex = rgbToHex( rgb );
    const hsl = rgbToHsl( rgb );

    setColor( { hex, rgb, hsl } );

}
function setHsl ( hsl ) {

    const hex = hslToHex( hsl );
    const rgb = hslToRgb( hsl );

    setColor( { hex, rgb, hsl } );

}

/**
 *
 */
export { GlobalColorContext };
