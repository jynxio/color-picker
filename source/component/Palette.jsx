/**
 *
 */
import style from "./palette.module.css";

/**
 *
 */
import { createSignal, useContext, Switch, Match, For } from "solid-js";

import { GlobalColorContext } from "../context/GlobalColorContext";

/**
 *
 */
function Palette ( props ) {

    return (
        <Switch>
            <Match when={ props.mode === "hex" }>
                <Hex/>
            </Match>
            <Match when={ props.mode === "rgb" }>
                <Rgb/>
            </Match>
            <Match when={ props.mode === "hsl" }>
                <Hsl/>
            </Match>
        </Switch>
    );

}

function Hex ( props ) {

    const global_color = useContext( GlobalColorContext );

    const getR = _ => global_color.getHex()[ 0 ];
    const getG = _ => global_color.getHex()[ 1 ];
    const getB = _ => global_color.getHex()[ 2 ];
    const getA = _ => global_color.getHex()[ 3 ];

}

function Rgb ( props ) {}

function Hsl ( props ) {}

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

/**
 *
 */
export { Palette };