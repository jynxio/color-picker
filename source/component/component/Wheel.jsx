/**
 *
 */
import { createMemo } from "solid-js";

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

    return (
        <div class={ style.wheel }>
            <div class={ style.ring }>
                <div class={ style.overlay }></div>
                <span class={ style.anchor } style={ createAnchorStyle() }></span>
            </div>
            <div class={ style.info }>
                <p class={ style.name }>Hue</p>
                <p class={ style.value }>{ getValue() + "deg" }</p>
            </div>
        </div>
    );

    function createAnchorStyle () {

        // TODO top、left的计算过程中使用了很多硬编码的值，这些值来自于CSS样式表，你需要将计算过程与CSS做解耦

        const degree = getValue();
        const radian = degree / 180 * Math.PI;

        // BUG top 不应该 -2px

        const top = `calc( 50% - ${ Math.cos( radian ) } * calc( 50% - 13px ) - 2px )`;
        const left = `calc( ${ Math.sin( radian ) } * calc( 50% - 13px ) + 50% + 2px )`;
        const transform = `translate( -50%, -50% ) rotate( ${ degree }deg )`;

        return { top, left, transform };

    }

}

/**
 *
 */
export { Wheel };
