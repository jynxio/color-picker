/* -------------------------------------------------------------------------------------------- */
import style from "./cartesian.module.css";

/* -------------------------------------------------------------------------------------------- */
import { createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { equal } from "../../math/equal";

/**
 * 色板组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string[] } props.names - 名称数组。
 * @param { number[] } props.getValues - 值数组的getter。
 * @param { Function[] } props.setValues - 值数组的setter。
 * @returns { JSX } 色板组件。
 */
function Cartesian ( props ) {

    const [ getEnabled, setEnabled ] = createSignal( false );
    const initial_memo_values = props.getValues();
    const getMemoValues = createMemo( _ => props.getValues(), initial_memo_values, { equals: ( prev, next ) => {

        if ( ! equal( prev[ 0 ], next[ 0 ] ) ) return false;
        if ( ! equal( prev[ 1 ], next[ 1 ] ) ) return false;

        return true;

    } } );

    let dom;
    let size;

    let base_values;
    let base_positions;

    const observer = new ResizeObserver( entries => size = entries[ 0 ].contentBoxSize[ 0 ].inlineSize );

    createEffect( _ => {

        document.documentElement.style.setProperty(
            "cursor",
            getEnabled() ? "all-scroll" : "",
            getEnabled() ? "important" : "",
        );

    } );

    onMount( _ => {

        observer.observe( dom );

        globalThis.addEventListener( "pointerup", handlePointerUpEvent, false );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent, false );

    } );

    onCleanup( _ => {

        observer.unobserve( dom );

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent, false );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent, false );

        document.documentElement.style.setProperty( "cursor", "" );

    } );

    return (
        <div class={ style.cartesian }>
            <div class={ `${ style.axis } ${ style.horizontal } ${ style.tag }` }>
                <span>{ props.names[ 0 ] }</span>
            </div>
            <div class={ `${ style.axis } ${ style.horizontal } ${ style.value }` }>
                <span>{ getMemoValues()[ 0 ] + "%" }</span>
            </div>
            <div class={ `${ style.axis } ${ style.vertical } ${ style.tag }` }>
                <span>{ props.names[ 1 ] }</span>
            </div>
            <div class={ `${ style.axis } ${ style.vertical } ${ style.value }` }>
                <span>{ getMemoValues()[ 1 ] + "%" }</span>
            </div>
            <div class={ style.board } ref={ dom }>
                <div class={ `${ style.mixcolor } ${ style.lower }` }></div>
                <div class={ `${ style.mixcolor } ${ style.upper }` }></div>
                <span class={ style.anchor } style={ createStyle() } onPointerDown={ handlePointerDownEvent }></span>
            </div>
        </div>
    );

    function createStyle () {

        const top = getMemoValues()[ 1 ] + "%";
        const left = getMemoValues()[ 0 ] + "%";
        const cursor = getEnabled() ? "all-scroll" : "grab";

        return { top, left, cursor };

    }

    function handlePointerUpEvent ( event ) {

        setEnabled( false );

    }

    function handlePointerDownEvent ( event ) {

        setEnabled( true );

        base_values = getMemoValues();
        base_positions = [ event.screenX, event.screenY ];

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! getEnabled() ) return;

        const next_values = [];
        const next_positions = [ event.screenX, event.screenY ];

        next_values[ 0 ] = ( next_positions[ 0 ] - base_positions[ 0 ] ) / size * 100 + base_values[ 0 ];
        next_values[ 0 ] = Math.min( next_values[ 0 ], 100 );
        next_values[ 0 ] = Math.max( next_values[ 0 ], 0 );
        next_values[ 0 ] = Math.round( next_values[ 0 ] );

        next_values[ 1 ] = ( next_positions[ 1 ] - base_positions[ 1 ] ) / size * 100 + base_values[ 1 ];
        next_values[ 1 ] = Math.min( next_values[ 1 ], 100 );
        next_values[ 1 ] = Math.max( next_values[ 1 ], 0 );
        next_values[ 1 ] = Math.round( next_values[ 1 ] );

        props.setValues( next_values );

    }

}

/* -------------------------------------------------------------------------------------------- */
export { Cartesian };
