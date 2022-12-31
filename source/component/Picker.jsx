import style from "./picker.module.css";

import { createSignal, onMount, For, onCleanup } from "solid-js";

export default function () {

    return <RgbPicker />;

}

function RgbPicker () {

    const names = [ "red", "green", "blue", "alpha" ];

    return (
        <div class={ style.picker }>
            <For each={ names }>{ name => <RgbColorMap name={ name } /> }</For>
        </div>
    );

}

/**
 * RGB色带构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.name - 颜色名，仅限于"red"、"green"、"blue"、"alpha"其中的一个。
 * @returns { JSX } - 色带。
 */
function RgbColorMap ( props ) {

    let is_down = false;
    let previous_color_value = 128;
    let previous_x, anchor_dom, anchor_dom_width;

    const resize_observer = new ResizeObserver( entries => {

        anchor_dom_width = entries[ 0 ].contentBoxSize[ 0 ].inlineSize;

    } );

    onMount( _ => {

        // TODO 将这两个事件监听器提升到RgbPicker中去，以减少事件监听器的数量。

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

        resize_observer.observe( anchor_dom );

    } );

    onCleanup(  _ => {

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

        resize_observer.unobserve( anchor_dom );

    } );

    const [ getColorValue, setColorValue ] = createSignal( previous_color_value );

    return (
        <div class={ style[ props.name ] }>
            <span class={ style[ "color-name" ] }>
                { props.name[ 0 ].toUpperCase().concat( ... props.name.slice( 1 ) ) }
            </span>
            <span class={ style[ "color-value" ] }>
                { getColorValue() }
            </span>
            <div class={ style[ "color-map" ] }>
                <div class={ style[ "overlay" ] }></div>
                <div class={ style[ "anchor" ] } ref={ anchor_dom }>
                    <span
                        onPointerDown={ handlePointerDownEvent }
                        style={ { left: getColorValue() / 255 * 100 + "%" } }
                    ></span>
                </div>
            </div>
        </div>
    );

    function handlePointerUpEvent ( event ) {

        if ( is_down ) is_down = false;

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! is_down ) return;

        let next_color_value = ( event.screenX - previous_x ) / anchor_dom_width * 255 + previous_color_value;

        next_color_value = Math.round( next_color_value );

        if ( next_color_value < 0 ) next_color_value = 0;
        if ( next_color_value > 255 ) next_color_value = 255;

        setColorValue( next_color_value );

    }

    function handlePointerDownEvent ( event ) {

        is_down = true;

        previous_x = event.screenX;
        previous_color_value = getColorValue();

    }

}
