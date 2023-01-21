/* -------------------------------------------------------------------------------------------- */
import style from "./output.module.css";

/* -------------------------------------------------------------------------------------------- */
import { createMemo, onCleanup, onMount } from "solid-js";
import { getGlobalRgb, getGlobalHex, getGlobalHsl } from "../color/color";
import { rgbToString, hexToString, hslToString } from "../color/convertor";

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

    let copy_button;
    let output_button;
    let palette_button;

    onMount( _ => globalThis.addEventListener( "keydown", handleKeyDownEvent ) );
    onCleanup( _ => globalThis.removeEventListener( "keydown", handleKeyDownEvent ) );

    const getBorderColor = createMemo( _ => {

        const [ , , l, a ] = getGlobalHsl();

        if ( a < 0.42 ) return "#000";
        if ( l < 0.63 ) return "#fff";

        return "#000";

    } );

    return (
        <div class={ style.output }>
            <pre class={ style.value } style={ { "border-color": getBorderColor() } }>{ createColorString() }</pre>
            <div class={ style.controller } style={ { "border-color": getBorderColor() } }>
                <button ref={ copy_button } onPointerDown={ handleCopyEvent }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                <button ref={ output_button } onPointerDown={ handleSwitchOutputFormatEvent }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path><path d="M14.5 17.5 4.5 15"></path></svg></button>
                <button ref={ palette_button } onPointerDown={ handleSwitchPaletteFormatEvent }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg></button>
            </div>
        </div>
    );

    function createColorString () {

        const format = props.outputFormat; // "rgb" or "hex" or "hsl"
        const string =
            format === "rgb" ? "rgb(" + rgbToString( getGlobalRgb() ) + ")" :
            format === "hex" ? "#" + hexToString( getGlobalHex() ) :
            format === "hsl" ? "hsl(" + hslToString( getGlobalHsl() ) + ")" :
            new Error( "Error: Unexpected situation." );

        if ( string instanceof Error ) throw string;

        return string;

    }

    function handleCopyEvent () {

        const format = props.outputFormat; // "rgb" or "hex" or "hsl"
        const text =
            format === "rgb" ? rgbToString( getGlobalRgb() ) :
            format === "hex" ? hexToString( getGlobalHex() ) :
            format === "hsl" ? hslToString( getGlobalHsl() ) :
            new Error( "Error: Unexpected situation." );

        if ( text instanceof Error ) throw text;

        navigator.clipboard.writeText( text );

    }

    function handleSwitchOutputFormatEvent () {

        props.toNextOutputFormat();

    }

    function handleSwitchPaletteFormatEvent () {

        props.toNextPaletteFormat();

    }

    function handleKeyDownEvent ( event ) {

        const key = event.key.toLowerCase();

        if ( key === "c" ) return copy_button.dispatchEvent( new PointerEvent( "pointerdown", { bubbles: true } ) );
        if ( key === "s" ) return output_button.dispatchEvent( new PointerEvent( "pointerdown", { bubbles: true } ) );
        if ( key === "w" ) return palette_button.dispatchEvent( new PointerEvent( "pointerdown", { bubbles: true } ) );

    }

}

/* -------------------------------------------------------------------------------------------- */
export { Output };
