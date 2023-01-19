/* -------------------------------------------------------------------------------------------- */
import { createSignal, createEffect } from "solid-js";

/* -------------------------------------------------------------------------------------------- */
const KEY = "color-picker-storage";
const STORAGE = JSON.parse( localStorage.getItem( KEY ) ) ?? {};

function createStorage ( key, initial_value ) {

    STORAGE[ key ] = STORAGE[ key ] ?? initial_value;

    const [ getValue, setValue ] = createSignal( STORAGE[ key ] );

    createEffect( _ => STORAGE[ key ] = getValue() );

    return [ getValue, setValue ];

}

globalThis.addEventListener( "beforeunload", _ => localStorage.setItem( KEY, JSON.stringify( STORAGE ) ) );

/* -------------------------------------------------------------------------------------------- */
export { createStorage };
