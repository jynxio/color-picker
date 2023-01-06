/**
 *
 */
import style from "./palette.module.css";

/**
 *
 */
import { createSignal, useContext, Switch, Match, For, onMount, onCleanup, createMemo } from "solid-js";

import { GlobalColorContext } from "../context/GlobalColorContext";

/**
 * Palette组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.format - 颜色格式，仅限于"hex"、"rgb"、"hsl"中的一种。
 * @returns { JSX } - Palette组件。
 */
function Palette ( props ) {

    return (
        <Switch>
            <Match when={ props.format === "hex" }>
                <Hex/>
            </Match>
            <Match when={ props.format === "rgb" }>
                <Rgb/>
            </Match>
            <Match when={ props.format === "hsl" }>
                <Hsl/>
            </Match>
        </Switch>
    );

}

function Hex () {

    const global_color = useContext( GlobalColorContext );

    const getR = _ => global_color.getHex()[ 0 ];
    const getG = _ => global_color.getHex()[ 1 ];
    const getB = _ => global_color.getHex()[ 2 ];
    const getA = _ => global_color.getHex()[ 3 ];

    const setR = r => global_color.setHex( [ r, getG(), getB(), getA() ] );
    const setG = g => global_color.setHex( [ getR(), g, getB(), getA() ] );
    const setB = b => global_color.setHex( [ getR(), getG(), b, getA() ] );
    const setA = a => global_color.setHex( [ getR(), getG(), getB(), a ] );

    return (
        <div class={ style.picker }>
            <Ribbon name={ "red" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getR() } setValue={ setR }/>
            <Ribbon name={ "green" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getG() } setValue={ setG }/>
            <Ribbon name={ "blue" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getB() } setValue={ setB }/>
            <Ribbon name={ "alpha" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getA() } setValue={ setA }/>
        </div>
    );

}

function Rgb () {

    const global_color = useContext( GlobalColorContext );

    const getR = _ => global_color.getRgb()[ 0 ];
    const getG = _ => global_color.getRgb()[ 1 ];
    const getB = _ => global_color.getRgb()[ 2 ];
    const getA = _ => global_color.getRgb()[ 3 ];

    const setR = r => global_color.setRgb( [ r, getG(), getB(), getA() ] );
    const setG = g => global_color.setRgb( [ getR(), g, getB(), getA() ] );
    const setB = b => global_color.setRgb( [ getR(), getG(), b, getA() ] );
    const setA = a => global_color.setRgb( [ getR(), getG(), getB(), a ] );

    return (
        <div class={ style.picker }>
            <Ribbon name={ "red" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getR() } setValue={ setR }/>
            <Ribbon name={ "green" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getG() } setValue={ setG }/>
            <Ribbon name={ "blue" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getB() } setValue={ setB }/>
            <Ribbon name={ "alpha" } minimum={ 0 } maximum={ 100 } unit={ "%" } value={ Math.round( getA() * 100 ) } setValue={ a => setA( a / 100 ) }/>
        </div>
    );

}

function Hsl ( props ) {}

/**
 * 色带组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.name - 名称，仅限于"red"、"green"、"blue"、"alpha"中的一种。
 * @param { number } props.minimum - 最小值。
 * @param { number } props.maximum - 最大值。
 * @param { number } props.value - 值。
 * @param { string } props.unit - 单位。
 * @param { Function } props.setValue - 值的setter。
 * @returns { JSX } - 色带组件。
 */
function Ribbon ( props ) {

    const getValue = createMemo( _ => props.value );

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
            <span class={ style.value }>{ getValue() + props.unit }</span>
            <div class={ style.range }>
                <div class={ style.overlay }></div>
                <div class={ style.anchor } ref={ dom }>
                    <span
                        onPointerDown={ handlePointerDownEvent }
                        style={ { left: ( getValue() - props.minimum ) / ( props.maximum - props.minimum ) * 100 + "%" } }
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

        base_value = getValue();
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
