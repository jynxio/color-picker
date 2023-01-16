/* -------------------------------------------------------------------------------------------- */
import style from "./ribbon.module.css";

/* -------------------------------------------------------------------------------------------- */
import { onMount, onCleanup, createMemo, createSignal, createEffect } from "solid-js";

/**
 * 色带组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.name - 名称，仅限于"red"、"green"、"blue"、"alpha"中的一种。
 * @param { string } props.class - 类型。
 * @param { number } props.minimum - 最小值。
 * @param { number } props.maximum - 最大值。
 * @param { string } props.unit - 单位。
 * @param { number } props.getValue - 值的getter。
 * @param { Function } props.setValue - 值的setter。
 * @returns { JSX } - 色带组件。
 */
function Ribbon ( props ) {

    const getMemoValue = createMemo( _ => props.getValue() );
    const [ getEnabled, setEnabled ] = createSignal( false );

    let dom;
    let width;

    let base_value;
    let base_position;

    const observer = new ResizeObserver( entries => width = entries[ 0 ].contentBoxSize[ 0 ].inlineSize );

    createEffect( _ => {

        document.documentElement.style.setProperty(
            "cursor",
            getEnabled() ? "ew-resize" : "",
            getEnabled() ? "important" : "",
        );

    } );

    onMount( _ => {

        observer.observe( dom );

        globalThis.addEventListener( "pointerup", handlePointerUpEvent );
        globalThis.addEventListener( "pointermove", handlePointerMoveEvent );

    } );

    onCleanup( _ => {

        observer.unobserve( dom );

        globalThis.removeEventListener( "pointerup", handlePointerUpEvent );
        globalThis.removeEventListener( "pointermove", handlePointerMoveEvent );

        document.documentElement.style.setProperty( "cursor", "" );

    } );

    return (
        <div class={ `${ style.ribbon } ${ style[ props.class ] }` }>
            <span class={ style.text }>{ props.name }</span>
            <span class={ style.value }>{ getMemoValue() + props.unit }</span>
            <div class={ style.range }>
                <div class={ style.overlay }></div>
                <div class={ style.anchor } ref={ dom }>
                    <span
                        onPointerDown={ handlePointerDownEvent }
                        style={ createStyle() }
                    ></span>
                </div>
            </div>
        </div>
    );

    function createStyle () {

        const left = ( getMemoValue() - props.minimum ) / ( props.maximum - props.minimum ) * 100 + "%";
        const cursor = getEnabled() ? "ew-resize" : "grab";

        return ( { left, cursor } );

    }

    function handlePointerUpEvent () {

        setEnabled( false );

    }

    function handlePointerDownEvent ( event ) {

        setEnabled( true );

        base_value = getMemoValue();
        base_position = event.screenX;

    }

    function handlePointerMoveEvent ( event ) {

        if ( ! getEnabled() ) return;

        let next_value;
        let next_position = event.screenX;

        next_value = ( next_position - base_position ) / width * ( props.maximum - props.minimum ) + base_value;
        next_value = Math.min( next_value, props.maximum );
        next_value = Math.max( next_value, props.minimum );
        next_value = Math.round( next_value );

        props.setValue( next_value );

    }

}

/* -------------------------------------------------------------------------------------------- */
export { Ribbon };
