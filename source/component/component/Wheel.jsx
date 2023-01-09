/**
 *
 */
import { createMemo, onCleanup, onMount } from "solid-js";

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

    let active = false;

    let ring_dom, anchor_dom;
    let base_value, base_x, base_y;

    onMount( _ => {

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

    } );

    onCleanup( _ => {

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

    } );

    const getValue = createMemo( _ => props.value );

    return (
        <div class={ style.wheel }>
            <div class={ style.ring } ref={ ring_dom }>
                <div class={ style.overlay }></div>
            </div>
            <div class={ style.info }>
                <p class={ style.name }>Hue</p>
                <p class={ style.value }>{ getValue() + "deg" }</p>
            </div>
            <div class={ style.anchor } style={ createAnchorStyle() } onPointerDown={ handlePointerDownEvent } ref={ anchor_dom }></div>
        </div>
    );

    function createAnchorStyle () {

        const ring_width = "13px"; // 该值等于--ribbon-width和--border-width之和

        const degree = getValue();
        const radian = degree / 180 * Math.PI;

        const top = `calc( 50% - ${ Math.cos( radian ) } * calc( 50% - ${ ring_width } ) )`;
        const left = `calc( ${ Math.sin( radian ) } * calc( 50% - ${ ring_width } ) + 50% )`;
        const transform = `translate( -50%, -50% ) rotate( ${ degree }deg )`;

        return { top, left, transform };

    }

    function handlePointerUpEvent () {

        active = false;

    }

    function handlePointerDownEvent ( event ) {

        active = true;

        base_value = getValue();
        [ base_x, base_y ] = [ event.screenX, event.screenY ];

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! active ) return;

        const { top, right, bottom, left } = ring_dom.getBoundingClientRect();
        const origin_position = [ ( right + left ) / 2, ( top + bottom ) / 2 ]; // TODO

    }

}

/**
 *
 */
export { Wheel };
