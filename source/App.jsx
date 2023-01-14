/* -------------------------------------------------------------------------------------------- */
import style from "./app.module.css";

import { createSignal, onCleanup, onMount } from "solid-js";
import { rgbToString } from "./color/convertor";
import { getGlobalRgb } from "./color/color";
import { Palette } from "./component/Palette";

/* -------------------------------------------------------------------------------------------- */
function App () {

    const [ getFormat, setFormat ] = createSignal( "rgb" ); // "rgb" or "hsl"

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

        setFormat( getFormat() === "rgb" ? "hsl" : "rgb" );

    }

}

/* -------------------------------------------------------------------------------------------- */
export { App };
