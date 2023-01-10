/**
 *
 */
import { createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";

import style from "./wheel.module.css";

/**
 * 色轮组件构造器
 * @param { Object } props - 参数字典。
 * @param { string } props.name - 名称。
 * @param { string } props.value - 值。
 * @param { Function } props.setValue - 值的setter。
 * @returns { JSX } - 色轮组件。
 */
function Wheel ( props ) {

    const getValue = createMemo( _ => props.value );
    const [ getActive, setActive ] = createSignal( false );

    let dom;
    let base_value, base_x, base_y;

    createEffect( _ => {

        document.documentElement.style.setProperty(
            "cursor",
            getActive() ? "all-scroll" : "",
            getActive() ? "important" : "",
        );

    } );

    onMount( _ => {

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

    } );

    onCleanup( _ => {

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

        document.documentElement.style.setProperty( "cursor", "" );

    } );

    return (
        <div class={ style.wheel }>
            <div class={ style.ring } ref={ dom }>
                <div class={ style.overlay }></div>
            </div>
            <div class={ style.info }>
                <p class={ style.name }>{ props.name[ 0 ].toUpperCase().concat( props.name.slice( 1 ) ) }</p>
                <p class={ style.value }>{ getValue() + "deg" }</p>
            </div>
            <div
                class={ style.anchor }
                style={ createStyle() }
                onPointerDown={ handlePointerDownEvent }
            ></div>
        </div>
    );

    function createStyle () {

        const ring_width = "13px"; // 该值等于--ribbon-width和--border-width之和

        const degree = getValue();
        const radian = degree / 180 * Math.PI;

        const top = `calc( 50% - ${ Math.cos( radian ) } * calc( 50% - ${ ring_width } ) )`;
        const left = `calc( ${ Math.sin( radian ) } * calc( 50% - ${ ring_width } ) + 50% )`;
        const transform = `translate( -50%, -50% ) rotate( ${ degree }deg )`;

        const cursor = getActive() ? "all-scroll" : "grab";

        return { top, left, transform, cursor };

    }

    function handlePointerUpEvent ( event ) {

        setActive( false );

    }

    function handlePointerDownEvent ( event ) {

        setActive( true );

        base_value = getValue();
        [ base_x, base_y ] = [ event.clientX, event.clientY ];

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! getActive() ) return;

        const rect = dom.getBoundingClientRect();
        const origin_position = [ ( rect.right + rect.left ) / 2, ( rect.top + rect.bottom ) / 2 ];
        const base_position = [ base_x, base_y ];
        const next_position = [ event.clientX, event.clientY ];

        const vector_a = [ base_position[ 0 ] - origin_position[ 0 ], origin_position[ 1 ] - base_position[ 1 ] ];
        const vector_b = [ next_position[ 0 ] - origin_position[ 0 ], origin_position[ 1 ] - next_position[ 1 ] ];

        let delta_degree = calculateClockwiseAngle( vector_a, vector_b );

        props.setValue( Math.round( base_value + delta_degree ) % 360 );

    }

}

/**
 * 计算平面向量A到平面向量B的顺时针角度。
 * @param { number[] } v_a - 如[x, y]。
 * @param { number[] } v_b - 如[x, y]。
 * @returns { number } - 角度，单位为度，值域为[0, 360)。
 */
function calculateClockwiseAngle ( v_a, v_b ) {

    v_a = [ ... v_a ];
    v_b = [ ... v_b ];

    const cos_theta = calculateDotProduct( v_a, v_b ) / calculateNorm( v_a ) / calculateNorm( v_b );

    if ( isNumberEqual( cos_theta, 1 ) ) { return 0 }     // 处理共线情况
    if ( isNumberEqual( cos_theta, - 1 ) ) { return 180 } // 处理共线情况

    const theta = Math.acos( cos_theta );
    const z = calculateCrossProduct( v_a, v_b )[ 2 ];

    if ( z < 0 ) return theta / Math.PI * 180;
    if ( z > 0 ) return ( Math.PI * 2 - theta ) / Math.PI * 180;

    throw( new Error( "Error: Unexpected situation" ) );

    function calculateDotProduct ( v_a, v_b ) {

        return v_a[ 0 ] * v_b[ 0 ] + v_a[ 1 ] * v_b[ 1 ];

    }

    function calculateCrossProduct( v_a, v_b ){

        v_a = [ ... v_a, 0 ];
        v_b = [ ... v_b, 0 ];

        return [
            v_a[ 1 ] * v_b[ 2 ] - v_b[ 1 ] * v_a[ 2 ],
            v_b[ 0 ] * v_a[ 2 ] - v_a[ 0 ] * v_b[ 2 ],
            v_a[ 0 ] * v_b[ 1 ] - v_b[ 0 ] * v_a[ 1 ],
        ];

    }

    function calculateNorm ( v ) {

        return Math.hypot( ... v );

    }

    function isNumberEqual ( n_a, n_b ) {

        return Math.abs( n_a - n_b ) < Number.EPSILON;

    }

}

/**
 *
 */
export { Wheel };
