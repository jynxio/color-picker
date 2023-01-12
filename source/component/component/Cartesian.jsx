/* -------------------------------------------------------------------------------------------- */
import style from "./cartesian.module.css";

/* -------------------------------------------------------------------------------------------- */
import { createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";

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

        for ( let i = 0; i < prev.length; i ++ ) {

            if ( prev[ i ] !== next[ i ] ) return true

        }

        return false;

    } } );

    createEffect( _ => {

        document.documentElement.style.setProperty(
            "cursor",
            getEnabled() ? "all-scroll" : "",
            getEnabled() ? "important" : "",
        );

    } );

    onMount( _ => {

        globalThis.addEventListener( "pointerup", handlePointerUpEvent, false );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent, false );

    } );

    onCleanup( _ => {

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent, false );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent, false );

        document.documentElement.style.setProperty( "cursor", "" );

    } );

    return (
        <div class={ style.cartesian }>
            <div class={ `${ style.axis } ${ style.x }` }>
                <span>{ props.names[ 0 ] }</span>
            </div>
            <div class={ `${ style.axis } ${ style.y }` }>
                <span>{ props.names[ 1 ] }</span>
            </div>
            <div class={ style.board }>
                <div class={ `${ style.mixcolor } ${ style.lower }` }></div>
                <div class={ `${ style.mixcolor } ${ style.upper }` }></div>
                <span class={ style.anchor } style={ createStyle() } onPointerDown={ handlePointerDownEvent }></span>
            </div>
        </div>
    );

    function createStyle () {

        // TODO 计算top和left，我不想让这个计算过程与CSS的--border-width耦合在一起，我需要重构吗？

        const cursor = getEnabled() ? "all-scroll" : "grab";

        return { cursor };

    }

    function handlePointerUpEvent ( event ) {

        setEnabled( false );

    }

    function handlePointerDownEvent ( event ) {

        setEnabled( true );

    }

    function handlePointerMoveEvent ( event ) {}

}

/* -------------------------------------------------------------------------------------------- */
export { Cartesian };
