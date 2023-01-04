/**
 *
 */
import style from "./app.module.css";

/**
 *
 */
import { createSignal } from "solid-js";

import Palette from "./component/Palette";

import Output from "./component/Output";

/**
 *
 */
export default function App () {

    const [ getRgb, setRgb ] = createSignal( [ 0, 0, 0, 1 ] );
    const calculateColorString = _ => {

        const [ r, g, b, a ] = getRgb();

        return `rgb( ${ r } ${ g } ${ b } / ${ a } )`;

    };

    return (
            <div
                class={ style.container }
                style={ { "background-color": calculateColorString() } }
            >
                <Palette />
                <Output />
            </div>
    );

}
