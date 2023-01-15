/* -------------------------------------------------------------------------------------------- */
import style from "./output.module.css";

/* -------------------------------------------------------------------------------------------- */
import { getGlobalRgb, getGlobalHex, getGlobalHsl } from "../color/color";

/* -------------------------------------------------------------------------------------------- */
/**
 * Output组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.outputFormat - Output组件的颜色格式，仅限于"rgb"、"hex"、"hsl"中的一种。
 * @param { string } props.paletteFormat - Palette组件的颜色格式，"rgb"或"hsl"。
 * @param { Function } props.toNextOutputFormat - 无参函数，用于切换至下一种outputFormat。
 * @param { Function } props.toNextPaletteFormat - 无参函数，用于切换至下一种paletteFormat。
 * @returns { JSX } - Output组件。
 */
function Output ( props ) {

    return (
        <div class={ style.output }>
            <pre class={ style.value }>{ createColorString() }</pre>
            <div class={ style.controller }>
                <button onPointerDown={ handleCopyEvent }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                <button onPointerDown={ handleSwitchOutputFormatEvent }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path><path d="M14.5 17.5 4.5 15"></path></svg></button>
                <button onPointerDown={ handleSwitchPaletteFormatEvent }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg></button>
            </div>
        </div>
    );

    function createColorString () {

        const format = props.outputFormat; // "rgb" or "hex" or "hsl"
        const string =
            format === "rgb" ? rgbToString( getGlobalRgb() ) :
            format === "hex" ? hexToString( getGlobalHex() ) :
            format === "hsl" ? hslToString( getGlobalHsl() ) : undefined;

        if ( ! string ) throw new Error( "Error: Unexpected situation." );

        return string;

        function hexToString ( hex ) {

            let [ r, g, b, a ] = hex;

            r = ( r <= 0xf ? "0" : "" ) + r.toString( 16 );
            g = ( g <= 0xf ? "0" : "" ) + g.toString( 16 );
            b = ( b <= 0xf ? "0" : "" ) + b.toString( 16 );
            a = ( a <= 0xf ? "0" : "" ) + a.toString( 16 );

            return "#" + r + g + b + a;

        }

        function rgbToString ( rgb ) {

            let [ r, g, b, a ] = rgb;

            r = Math.round( r ) + "";
            g = Math.round( g ) + "";
            b = Math.round( b ) + "";
            a = ( a * 100 ).toFixed() + "%";

            return `rgb(${ r } ${ g } ${ b } / ${ a })`;

        }

        function hslToString ( hsl ) {

            let [ h, s, l, a ] = hsl;

            h = Math.round( h ) + "deg";
            s = ( s * 100 ).toFixed() + "%";
            l = ( l * 100 ).toFixed() + "%";
            a = ( a * 100 ).toFixed() + "%";

            return `hsl(${ h } ${ s } ${ l } / ${ a })`;

        }

    }

    function handleCopyEvent () {

        const text = createColorString();

        navigator.clipboard.writeText( text );

    }

    function handleSwitchOutputFormatEvent () {

        props.toNextOutputFormat();

    }

    function handleSwitchPaletteFormatEvent () {

        props.toNextPaletteFormat();

    }

}



/* -------------------------------------------------------------------------------------------- */
export { Output };
