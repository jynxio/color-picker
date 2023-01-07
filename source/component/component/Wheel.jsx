/**
 *
 */
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

    return (
        <div class={ style.wheel }>
            <p class={ style.text }>Hue</p>
            <p class={ style.value }>255deg</p>
            <div class={ style.ring }>
                <span class={ style.anchor }></span>
            </div>
        </div>
    );

}

/**
 *
 */
export { Wheel };
