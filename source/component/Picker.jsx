import style from "./picker.module.css";

import ColorContext from "/source/context/ColorContext";

import { createSignal, createEffect, useContext, onMount, onCleanup } from "solid-js";

export default function ( props ) {

    return <RgbPicker />;

}

function RgbPicker () {

    const [ getRed, setRed ] = createSignal( 0 );
    const [ getGreen, setGreen ] = createSignal( 0 );
    const [ getBlue, setBlue ] = createSignal( 0 );
    const [ getAlpha, setAlpha ] = createSignal( 255 );

    const setHexColor = useContext( ColorContext );

    createEffect( _ => {

        let red = getRed().toString( 16 );
        let green = getGreen().toString( 16 );
        let blue = getBlue().toString( 16 );
        let alpha = getAlpha().toString( 16 );

        if ( red.length < 2 ) red = "0" + red;
        if ( green.length < 2 ) green = "0" + green;
        if ( blue.length < 2 ) blue = "0" + blue;
        if ( alpha.length < 2 ) alpha = "0" + alpha;

        const color = "#" + red + green + blue + alpha;

        setHexColor( color );

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

    return (
        <div class={ style.output }>
            <span class={ style.content }>
                { calculateHex( props.red, props.green, props.blue, props.alpha ) }
            </span>
            <span class={ style.toggle }>
                <button>Toggle</button>
            </span>
            <span class={ style.copy }>
                <button>Copy</button>
            </span>
        </div>
    );

    function calculateHex ( r, g, b, a ) {

        let hex_r = r.toString( 16 );
        let hex_g = g.toString( 16 );
        let hex_b = b.toString( 16 );
        let hex_a = a.toString( 16 );

        if ( hex_r.length < 2 ) hex_r = "0" + hex_r;
        if ( hex_g.length < 2 ) hex_g = "0" + hex_g;
        if ( hex_b.length < 2 ) hex_b = "0" + hex_b;
        if ( hex_a.length < 2 ) hex_a = "0" + hex_a;

        return "#" + hex_r + hex_g + hex_b + hex_a;

    }

}
