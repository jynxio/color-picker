/**
 *
 */
import style from "./cartesian.module.css";

/**
 *
 */

/**
 * 色板组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.horizontalName - 横轴名。
 * @param { string } props.verticalName - 纵轴名。
 * @param { number } props.horizontalValue - 横轴值。
 * @param { number } props.verticalValue - 纵轴值。
 * @param { Function } props.setHorizontalValue - 横轴值的setter。
 * @param { Function } props.setVerticalValue - 纵轴值的setter。
 * @returns { JSX } 色板组件。
 *
 */
function Cartesian ( props ) {

    return (
        <div class={ style.cartesian }>
            <div class={ `${ style.axis } ${ style.x }` }>
                <span>Saturation</span>
            </div>
            <div class={ `${ style.axis } ${ style.y }` }>
                <span>Lightness</span>
            </div>
            <div class={ style.board }>
                <div class={ `${ style.mixcolor } ${ style.lower }` }></div>
                <div class={ `${ style.mixcolor } ${ style.upper }` }></div>
                <span class={ style.anchor }></span>
            </div>
        </div>
    );

}

/**
 *
 */
export { Cartesian };
