/**
 *
 */
import style from "./app.module.css";

/**
 *
 */
import { createSignal, useContext } from "solid-js";

import { GlobalColorContext } from "./context/GlobalColorContext";

import { createRgbString } from "./helper/colorFormatConvertor";

import { Palette } from "./component/Palette";

// import { Output } from "./component/Output";

/**
 *
 */
function App () {

    const global_color = useContext( GlobalColorContext );

    const [ getMode, setMode ] = createSignal( "hex" ); // "hex" or "rgb" or "hsl"

    return (
        <GlobalColorContext.Provider>
            <div
                class={ style.container }
                style={ { "background-color": createRgbString( global_color.getRgb() ) } }
            >
                <Palette mode={ getMode() }/>
                {/* <Output getMode={ getMode } setMode={ setMode }/> */}
            </div>
        </GlobalColorContext.Provider>
    );

}

/**
 *
 */
export { App };
