/* -------------------------------------------------------------------------------------------- */
import style from "./app.module.css";

import { createStorage } from "./storage/createStorage";
import { getGlobalRgb } from "./color/color";
import { rgbToString } from "./color/convertor";
import { Palette } from "./component/Palette";
import { Output } from "./component/Output";
import { Footer } from "./component/Footer";

/* -------------------------------------------------------------------------------------------- */
function App () {

    const [ getPaletteFormat, setPaletteFormat ] = createStorage( "paletteFormat", "hsl" ); // "rgb" or "hsl"
    const [ getOutputFormat, setOutputFormat ] = createStorage( "outputFormat", "hsl" );    // "rgb" or "hex" or "hsl"

    return (
        <div
            class={ style.container }
            style={ { "background-color": "rgb( " + rgbToString( getGlobalRgb() ) + " )" } }
        >
            <Palette format={ getPaletteFormat() }/>
            <Output
                outputFormat={ getOutputFormat() }
                paletteFormat={ getPaletteFormat() }
                toNextOutputFormat={ toNextOutputFormat }
                toNextPaletteFormat={ toNextPaletteFormat }
            />
            <Footer/>
        </div>
    );

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
