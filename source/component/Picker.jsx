import style from "./picker.module.css";

import { For } from "solid-js";

import { createSignal, createEffect } from "solid-js";

import { onMount, onCleanup } from "solid-js";

export default function () {

    return <RgbPicker />;

}

function RgbPicker () {

    const [ getRed, setRed ] = createSignal( 128 );
    const [ getGreen, setGreen ] = createSignal( 128 );
    const [ getBlue, setBlue ] = createSignal( 128 );
    const [ getAlpha, setAlpha ] = createSignal( 128 );

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
        <div class={ style[ props.name ] }>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 11 21 7 17 3"></polyline><line x1="21" y1="7" x2="9" y2="7"></line><polyline points="7 21 3 17 7 13"></polyline><line x1="15" y1="17" x2="3" y2="17"></line></svg>
            </span>
            <span class={ style.copy }>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </span>
        </div>
    );

    function calculateHex ( r, g, b, a ) {

        const hex_r = r.toString( 16 );
        const hex_g = g.toString( 16 );
        const hex_b = b.toString( 16 );
        const hex_a = a.toString( 16 );

        return "#" + hex_r + hex_g + hex_b + hex_a;

    }

}
