/* -------------------------------------------------------------------------------------------- */
import style from "./footer.module.css";

/* -------------------------------------------------------------------------------------------- */
import { createMemo } from "solid-js";
import { getGlobalHsl } from "../color/color";

/* -------------------------------------------------------------------------------------------- */
function Footer () {

    const getColor = createMemo( _ => {

        const [ , , l, a ] = getGlobalHsl();

        if ( a < 0.42 ) return "#000";
        if ( l < 0.63 ) return "#fff";

        return "#000";

    } );

    return (
        <footer class={ style.footer } style={ { "color": getColor() } }>
            <address>Made with <a href="https://www.solidjs.com/" target="_blank">SolidJS</a></address>
            <hr style={ { "background-color": getColor() } }/>
            <address><a href="https://github.com/jynxio/color-picker" target="_blank">Source code</a></address>
        </footer>
    );

}

/* -------------------------------------------------------------------------------------------- */
export { Footer };
