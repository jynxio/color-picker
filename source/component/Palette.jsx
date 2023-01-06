/**
 *
 */
import style from "./palette.module.css"; // TODO

/**
 *
 */
import { createSignal, useContext, Switch, Match, For, onMount, onCleanup } from "solid-js";

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

    const setR = r => global_color.setHex( [ r, getG(), getB(), getA() ] );
    const setG = g => global_color.setHex( [ getR(), g, getB(), getA() ] );
    const setB = b => global_color.setHex( [ getR(), getG(), b, getA() ] );
    const setA = a => global_color.setHex( [ getR(), getG(), getB(), a ] );

    const ribbons = [
        { name: "red", minimum: 0, maximum:255, unit: "number", getValue: getR, setValue: setR },
        { name: "green", minimum: 0, maximum:255, unit: "number", getValue: getG, setValue: setG },
        { name: "blue", minimum: 0, maximum:255, unit: "number", getValue: getB, setValue: setB },
        { name: "alpha", minimum: 0, maximum:255, unit: "number", getValue: getA, setValue: setA },
    ];

    return (
        <div class={ style.picker }>
            <For each={ ribbons }>
                {
                    ribbon => {

                        const { name, minimum, maximum, unit, getValue, setValue } = ribbon;

                        return (
                            <Ribbon
                                name={ name }
                                minimum={ minimum }
                                maximum={ maximum }
                                unit={ unit }
                                getValue={ getValue }
                                setValue={ setValue }
                            />
                        );

                    }
                }
            </For>
        </div>
    );

    return (
        <div class={ style.picker }>
            <Ribbon name={ "red" } minimum={ 0 } maximum={ 255 } unit={ "number" }/>
            <Ribbon name={ "green" } minimum={ 0 } maximum={ 255 } unit={ "number" }/>
            <Ribbon name={ "blue" } minimum={ 0 } maximum={ 255 } unit={ "number" }/>
            <Ribbon name={ "alpha" } minimum={ 0 } maximum={ 255 } unit={ "number" }/>
        </div>
    );

}

function Rgb ( props ) {}

function Hsl ( props ) {}

/**
 * 色带。
 * @param { Object } props - 参数字典。
 * @param { string } props.name - 色带名（仅支持"red"、"green"、"blue"、"alpha"）。
 * @param { number } props.minimum - 最小值。
 * @param { number } props.maximum - 最大值。
 * @param { string } props.unit - 值的单位（仅支持"number"、"percentage"）。
 * @returns { JSX } - 色带。
 */
function Ribbon ( props ) {

    let dom;
    let width;

    let base_value;
    let base_position;

    let active = false;

    const observer = new ResizeObserver( entries => width = entries[ 0 ].contentBoxSize[ 0 ].inlineSize );

    onMount( _ => {

        observer.observe( dom );

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

    } );

    onCleanup( _ => {

        observer.unobserve( dom );

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

    } );

    return (
        <div class={ `${ style.color } ${ style[ props.name ] }` }>
            <span class={ style.text }>{ getUpperCamelCaseName() }</span>
            <span class={ style.value }>{ props.getValue() + ( props.unit === "number" ? "" : "%" ) }</span>
            <div class={ style.range }>
                <div class={ style.overlay }></div>
                <div class={ style.anchor } ref={ dom }>
                    <span
                        onPointerDown={ handlePointerDownEvent }
                        style={ { left: ( props.getValue() - props.minimum ) / ( props.maximum - props.minimum ) * 100 + "%" } }
                    ></span>
                </div>
            </div>
        </div>
    );

    function handlePointerUpEvent () {

        active = false;

    }

    function handlePointerDownEvent ( event ) {

        active = true;

        base_value = props.getValue();
        base_position = event.screenX;

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! active ) return;

        let next_value;
        let next_position = event.screenX;

        next_value = ( next_position - base_position ) / width * ( props.maximum - props.minimum ) + base_value;
        next_value = Math.min( next_value, props.maximum );
        next_value = Math.max( next_value, props.minimum );
        next_value = Math.round( next_value );

        props.setValue( next_value );

    }

    function getUpperCamelCaseName () {

        return props.name[ 0 ].toUpperCase().concat( ... props.name.slice( 1 ) );

    }

}

/**
 *
 */
export { Palette };
