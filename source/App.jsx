/* -------------------------------------------------------------------------------------------- */
import style from "./app.module.css";

import { createSignal, onCleanup, onMount } from "solid-js";
import { getGlobalRgb } from "./color/color";
import { Palette } from "./component/Palette";
import { Output } from "./component/Output";

/* -------------------------------------------------------------------------------------------- */
function App () {

    const [ getOutputFormat, setOutputFormat ] = createSignal( "rgb" );   // "rgb" or "hex" or "hsl"
    const [ getPaletteFormat, setPaletteFormat ] = createSignal( "rgb" ); // "rgb" or "hsl"

    onMount( _ => globalThis.addEventListener( "keydown", handleKeyDownEvent ) );
    onCleanup( _ => globalThis.removeEventListener( "keydown", handleKeyDownEvent ) );

    return (
        <div
            class={ style.container }
            style={ { "background-color": createBackgroundColorStyle() } }
        >
            <Palette format={ getPaletteFormat() }/>
            <Output
                outputFormat={ getOutputFormat() }
                paletteFormat={ getPaletteFormat() }
                toNextOutputFormat={ toNextOutputFormat }
                toNextPaletteFormat={ toNextPaletteFormat }
            />
        </div>
    );

    function createBackgroundColorStyle () {

        const [ r, g, b, a ] = getGlobalRgb();

        return `rgb( ${ r } ${ g } ${ b } / ${ a * 100 }% )`;

    }

    function handleKeyDownEvent ( event ) {

        if ( event.key.toLowerCase() !== "shift" ) return;

        const prev_format = getPaletteFormat();
        const next_format = prev_format === "rgb" ? "hsl" : "rgb";

        setPaletteFormat( next_format );

    }

    function toNextOutputFormat () {

        const formats = [ "hex", "rgb", "hsl" ];
        const prev_format = getOutputFormat();
        const next_format = formats[ ( formats.indexOf( prev_format ) + 1 ) % 3 ];

        setOutputFormat( next_format );

    }

    function toNextPaletteFormat () {

        const prev_format = getPaletteFormat();
        const next_format = prev_format === "rgb" ? "hsl" : "rgb";

        setPaletteFormat( next_format );

    }

}

/* -------------------------------------------------------------------------------------------- */
export { App };
