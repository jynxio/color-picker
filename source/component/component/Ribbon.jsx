/**
 *
 */
import style from "./ribbon.module.css";

/**
 *
 */
import { onMount, onCleanup, createMemo } from "solid-js";

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
        <div class={ `${ style.ribbon } ${ style[ props.name ] }` }>
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

export { Ribbon };
