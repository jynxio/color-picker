/* -------------------------------------------------------------------------------------------- */
import style from "./app.module.css";

import { createSignal, onCleanup, onMount } from "solid-js";
import { rgbToString } from "./color/convertor";
import { getGlobalRgb } from "./color/color";
import { Palette } from "./component/Palette";

/* -------------------------------------------------------------------------------------------- */
function App () {

    const formats = [ "hex", "rgb", "hsl" ];
    const [ getFormat, setFormat ] = createSignal( formats[ 2 ] );

    onMount( _ => globalThis.addEventListener( "keydown", handleKeyDownEvent ) );
    onCleanup( _ => globalThis.removeEventListener( "keydown", handleKeyDownEvent ) );

    return (
        <div
            class={ style.container }
            style={ { "background-color": rgbToString( getGlobalRgb() ) } }
        >
            <Palette format={ getFormat() }/>
        </div>
    );

    function handleKeyDownEvent ( event ) {

        if ( event.key.toLowerCase() !== "shift" ) return;

        const next_index = ( formats.indexOf( getFormat() ) + 1 ) % 3;
        const next_format = formats[ next_index ];

        setFormat( next_format );

    }

}

/* -------------------------------------------------------------------------------------------- */
export { App };
