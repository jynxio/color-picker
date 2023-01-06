/**
 *
 */
import style from "./app.module.css";

/**
 *
 */
import { createSignal, onCleanup, onMount, useContext } from "solid-js";

import { GlobalColorContext } from "./context/GlobalColorContext";

import { createRgbString } from "./helper/colorFormatConvertor";

import { Palette } from "./component/Palette";

// import { Output } from "./component/Output";

/**
 *
 */
function App () {

    const global_color = useContext( GlobalColorContext );

    const formats = [ "hex", "rgb", "hsl" ];
    const [ getFormat, setFormat ] = createSignal( formats[ 0 ] );

    onMount( _ => globalThis.addEventListener( "keydown", handleKeyDownEvent ) );
    onCleanup( _ => globalThis.removeEventListener( "keydown", handleKeyDownEvent ) );

    return (
        <div
            class={ style.container }
            style={ { "background-color": createRgbString( global_color.getRgb() ) } }
        >
            <Palette format={ getFormat() }/>
            {/* <Output getMode={ getMode } setMode={ setMode }/> */}
        </div>
    );

    function handleKeyDownEvent ( event ) {

        if ( event.key.toLowerCase() !== "shift" ) return;

        let next_index = formats.indexOf( getFormat() ) + 1;

        if ( next_index === formats.length ) next_index = 0;

        const next_format = formats[ next_index ];

        setFormat( next_format );

    }

}

/**
 *
 */
export { App };
