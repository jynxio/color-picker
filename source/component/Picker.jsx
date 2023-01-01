import style from "./picker.module.css";

import { For } from "solid-js";

import { createSignal, createEffect } from "solid-js";

import { onMount, onCleanup } from "solid-js";

export default function () {

    return <RgbPicker />;

}

function RgbPicker () {

    let red_anchor_dom;
    let red_anchor_dom_width;

    const color_names = [ "red", "green", "blue", "alpha" ];

    const [ getInitialX, setInitialX ] = createSignal( NaN );
    const [ getCurrentX, setCurrentX ] = createSignal( NaN );

    const [ getInitialValue, setInitialValue ] = createSignal( NaN ); // TODO 这是个糟糕的设计！你应该用更简洁的方法来实现它！

    const [ getCapturedAnchorName, setCapturedAnchorName ] = createSignal( "" );
    const [ getColorTable, setColorTable ] = createSignal( {
        [ color_names[ 0 ] ]: 128,
        [ color_names[ 1 ] ]: 128,
        [ color_names[ 2 ] ]: 128,
        [ color_names[ 3 ] ]: 128,
    } );

    const observer = new ResizeObserver( entries => red_anchor_dom_width = entries[ 0 ].contentBoxSize[ 0 ].inlineSize );

    onMount( _ => {

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

        observer.observe( red_anchor_dom );

    } );

    onCleanup( _ => {

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

        observer.unobserve( red_anchor_dom );

    } );

    return (
        <div class={ style.picker }>
            <For each={ color_names }>
                {
                    color_name => {

                        const text = color_name[ 0 ].toUpperCase().concat( ... color_name.slice( 1 ) );

                        return (
                            <div class={ style[ color_name ] }>
                                <span class={ style[ "color-text" ] }>{ text }</span>
                                <span class={ style[ "color-value" ] }>{ getColorTable()[ color_name ] }</span>
                                <div class={ style[ "color-map" ] }>
                                    <div class={ style[ "overlay" ] }></div>
                                    <div
                                        class={ style[ "anchor" ] }
                                        onPointerDown={ handlePointerDownEvent }
                                        ref={ ref => color_name === color_names[ 0 ] && ( red_anchor_dom = ref ) }
                                    >
                                        <span style={ { left: getColorTable()[ color_name ] / 255 * 100 + "%" } }></span>
                                    </div>
                                </div>
                            </div>
                        );

                        // TODO 如何注销这个事件呢？
                        function handlePointerDownEvent ( event ) {

                            setInitialX( event.screenX );
                            setCurrentX( event.screenX );

                            setInitialValue( getColorTable()[ color_name ] );

                            setCapturedAnchorName( color_name );

                        }

                    }
                }
            </For>
        </div>
    );

    function handlePointerUpEvent () {

        setInitialX( NaN );
        setCurrentX( NaN );

        setInitialValue( NaN );

        setCapturedAnchorName( "" );

    }

    function handlePointerMoveEvent ( event ) {

        if ( getCapturedAnchorName() === "" ) return;

        /**
         *
         */
        if ( Number.isNaN( getInitialX() ) ) throw new Error( "Error: An unexpected situation." );
        if ( Number.isNaN( getCurrentX() ) ) throw new Error( "Error: An unexpected situation." );

        setCurrentX( event.screenX );

        const initial_x = getInitialX();
        const current_x = getCurrentX();

        const offset_x = current_x - initial_x;

        /**
         *
         */
        const color_table = getColorTable();
        const color_name = getCapturedAnchorName();

        let initial_color_value = getInitialValue();
        let current_color_value = Math.round( offset_x / red_anchor_dom_width * 255 + initial_color_value );

        current_color_value = Math.max( current_color_value, 0 );
        current_color_value = Math.min( current_color_value, 255 );

        setColorTable( { ... color_table, [ color_name ]: current_color_value } )

    }

}
