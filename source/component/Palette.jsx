/**
 *
 */
import style from "./palette.module.css";

/**
 *
 */
import { createSignal, useContext, Show, For } from "solid-js";

import { GlobalColorContext } from "../context/GlobalColorContext";

/**
 *
 */
export function Palette ( props ) {

    return (
        <Show when={ props.mode === "hsl" } fallback={ <HexOrRgb mode={ props.mode }/> }>
            <Hsl/>
        </Show>
    );

}

// TODO from mode attribute

function HexOrRgb ( props ) {

    const ribbons = [ "red", "green", "blue", "alpha" ];

    const global_color = useContext( GlobalColorContext );

    const [ getRibbonIndex, setRibbonIndex ] = createSignal();

    return (
        <For each={ ribbons }>
            {
                ( ribbon, index ) => <Ribbon name={ ribbon } index={ index }/>
            }
        </For>
    );

}

function Hsl () {}

/**
 * 色带。
 * @param { Object } props - 参数字典。
 * @param { string } props.name - 色带名（仅支持"red"、"green"、"blue"、"alpha"）。
 * @param { number } props.minimum - 最小值。
 * @param { number } props.maximum - 最大值。
 * @param { number } props.initialValue - 初始值。
 * @param { string } props.unit - 值的单位（仅支持"number"、"percentage"）。
 * @returns { JSX } - 色带。
 */
function Ribbon ( props ) {

    const getUpperCamelCaseName = _ => props.name[ 0 ].toUpperCase().concat( ... props.name.slice( 1 ) );

    return (
        <div class={ `${ style.color } ${ style[ props.name ] }` }>
            <span class={ style.text }>{ getUpperCamelCaseName() }</span>
            <span class={ style.value }>{ props.value }</span>
            <div class={ style.range }>
                <div class={ style.overlay }></div>
                <div class={ style.anchor } ref={ anchor }>
                    <span
                        onPointerDown={ handlePointerDownEvent }
                        style={ { left: props.value / 255 * 100 + "%" } }
                    ></span>
                </div>
            </div>
        </div>
    );

}
