import style from "./picker.module.css";

import ColorContext from "/source/context/ColorContext";

import { createSignal, createEffect, useContext, onMount, onCleanup, Switch, Match } from "solid-js";

export default function ( props ) {

    return <RgbPicker />;

}

function RgbPicker () {

    const [ getRed, setRed ] = createSignal( 35 );
    const [ getGreen, setGreen ] = createSignal( 46 );
    const [ getBlue, setBlue ] = createSignal( 28 );
    const [ getAlpha, setAlpha ] = createSignal( 255 );

    const setBackgroundColor = useContext( ColorContext );

    createEffect( _ => {

        const color = calculateHexStringFromRgba( getRed(), getGreen(), getBlue(), getAlpha() );

        setBackgroundColor( color );

    } );

    return (
        <div class={ style.picker }>
            <RgbRibbon name={ "red" } value={ getRed() } setValue={ value => setRed( value ) } />
            <RgbRibbon name={ "green" } value={ getGreen() } setValue={ value => setGreen( value ) } />
            <RgbRibbon name={ "blue" } value={ getBlue() } setValue={ value => setBlue( value ) } />
            <RgbRibbon name={ "alpha" } value={ getAlpha() } setValue={ value => setAlpha( value ) } />
            <RgbOutput red={ getRed() } green={ getGreen() } blue={ getBlue() } alpha={ getAlpha() } />
        </div>
    );

}

function RgbRibbon ( props ) {

    let anchor;
    let anchor_width;

    let initial_value;
    let initial_position;
    let down_state = false;

    const observer = new ResizeObserver( entries => anchor_width = entries[ 0 ].contentBoxSize[ 0 ].inlineSize );

    onMount( _ => {

        observer.observe( anchor );

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

    } );

    onCleanup( _ => {

        observer.unobserve( anchor );

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

    } );

    const name = props.name;
    const text = name[ 0 ].toUpperCase().concat( ... name.slice( 1 ) );

    return (
        <div class={ `${ style.color } ${ style[ props.name ] }` }>
            <span class={ style.text }>{ text }</span>
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

    function handlePointerUpEvent () {

        down_state = false;

    }

    function handlePointerDownEvent ( event ) {

        down_state = true;

        initial_value = props.value;
        initial_position = event.screenX;

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! down_state ) return;

        let next_value;

        next_value = ( event.screenX - initial_position ) / anchor_width * 255 + initial_value;
        next_value = Math.min( next_value, 255 );
        next_value = Math.max( next_value, 0 );
        next_value = Math.round( next_value );

        props.setValue( next_value );

    }

}

function RgbOutput ( props ) {

    const [ getMode, setMode ] = createSignal( "hex" ); // "hex" or "rgb"

    onMount( _ => {

        globalThis.addEventListener( "keyup", handleKeyUpEvent );

    } );

    onCleanup( _ => {

        globalThis.removeEventListener( "keyup", handleKeyUpEvent );

    } );

    return (
        <div class={ style.output }>
            <pre>
                <Switch fallback={ "Error" }>
                    <Match when={ getMode() === "hex" }>{ getHexString() }</Match>
                    <Match when={ getMode() === "rgb" }>{ getRgbString() }</Match>
                </Switch>
            </pre>
        </div>
    );

    function handleKeyUpEvent ( event ) {

        const key = event.key.toLowerCase();

        if ( key !== "shift" && key !== "c" ) return;

        if ( key === "shift" ) {

            setMode( getMode() === "hex" ? "rgb" : "hex" );

            return;

        }

        const text = getMode() === "hex" ? getHexString() : getRgbString();

        navigator.clipboard.writeText( text )
            .then( _ => console.log( "写入成功" ) )
            .catch( _ => console.error( "写入失败" ) );

    }

    function getHexString () {

        return calculateHexStringFromRgba( props.red, props.green, props.blue, props.alpha );

    }

    function getRgbString () {

        return calculateRgbStringFromRgba( props.red, props.green, props.blue, props.alpha );

    }

}

/**
 * 创建Hex格式的颜色字符串。
 * @param { number } r - 红色值。
 * @param { number } g - 绿色值。
 * @param { number } b - 蓝色值。
 * @param { number } a - 透明色值。
 * @returns { string } - Hex格式的颜色字符串。
 * @example
 * f( 0, 0, 0, 255 ); // return "#000000ff"
 */
function calculateHexStringFromRgba ( r, g, b, a ) {

    let string_r = r.toString( 16 );
    let string_g = g.toString( 16 );
    let string_b = b.toString( 16 );
    let string_a = a.toString( 16 );

    if ( string_r.length < 2 ) string_r = "0" + string_r;
    if ( string_g.length < 2 ) string_g = "0" + string_g;
    if ( string_b.length < 2 ) string_b = "0" + string_b;
    if ( string_a.length < 2 ) string_a = "0" + string_a;

    return "#" + string_r + string_g + string_b + string_a;

}

/**
 * 创建RGB函数的参数字符串。
 * @param { number } r - 红色值。
 * @param { number } g - 绿色值。
 * @param { number } b - 蓝色值。
 * @param { number } a - 透明色值。
 * @returns { string } - RGB函数的参数字符串。
 * @example
 * f( 0, 0, 0, 255 ); // return "  0  0  0 / 255"
 */
function calculateRgbStringFromRgba ( r, g, b, a ) {

    let string_r = r.toString();
    let string_g = g.toString();
    let string_b = b.toString();
    let string_a = a.toString();

    string_r = createSpace( 3 - string_r.length ) + string_r;
    string_g = createSpace( 3 - string_g.length ) + string_g;
    string_b = createSpace( 3 - string_b.length ) + string_b;
    string_a = createSpace( 3 - string_a.length ) + string_a;

    return `${ string_r } ${ string_g } ${ string_b } / ${ string_a }`;

}

/**
 * 创建拥有零至多个空白符的字符串。
 * @param { number } count - 空白符的数量。
 * @returns { string } - 拥有零至多个空白符的字符串。
 * @example
 * f( 2 ); // return "  "
 */
function createSpace ( count ) {

    let space = "";

    for ( let i = 0; i < count; i ++ ) space += " ";

    return space;

}
