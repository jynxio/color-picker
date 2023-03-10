/* -------------------------------------------------------------------------------------------- */
import style from "./palette.module.css";

import { createMemo, onMount, onCleanup, Switch, Match } from "solid-js";
import { Ribbon } from "./component/Ribbon";
import { Wheel } from "./component/Wheel";
import { Cartesian } from "./component/Cartesian";
import { getGlobalRgb, getGlobalHsl, setGlobalRgb, setGlobalHsl } from "../color/color";

/**
 * Palette组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.format - 颜色格式，仅限于"rgb"或"hsl"。
 * @returns { JSX } - Palette组件。
 */
function Palette ( props ) {

    const getBorderColor = createMemo( _ => {

        const [ , , l, a ] = getGlobalHsl();

        if ( a < 0.42 ) return "#000";
        if ( l < 0.63 ) return "#fff";

        return "#000";

    } );

    onMount( _ => {

        /* 如果执行了下述代码，那么当用户在操纵锚的时候，浏览器就不会进行前进、后退、刷新 */
        globalThis.addEventListener( "touchmove", handleTouchMoveEvent, { passive: false } );

    } );

    onCleanup( _ => {

        globalThis.removeEventListener( "touchmove", handleTouchMoveEvent );

    } );

    return (
        <Switch>
            <Match when={ props.format === "rgb" }><Rgb style={ { "border-color": getBorderColor() } }/></Match>
            <Match when={ props.format === "hsl" }><Hsl style={ { "border-color": getBorderColor() } }/></Match>
        </Switch>
    );

    function handleTouchMoveEvent ( event ) {

        event.preventDefault();

    }

}

function Rgb ( props ) {

    const getR = _ => Math.round( getGlobalRgb()[ 0 ] );
    const getG = _ => Math.round( getGlobalRgb()[ 1 ] );
    const getB = _ => Math.round( getGlobalRgb()[ 2 ] );
    const getA = _ => Math.round( getGlobalRgb()[ 3 ] * 100 );

    const setR = r => setGlobalRgb( [ r, getG(), getB(), getA() / 100 ] );
    const setG = g => setGlobalRgb( [ getR(), g, getB(), getA() / 100 ] );
    const setB = b => setGlobalRgb( [ getR(), getG(), b, getA() / 100 ] );
    const setA = a => setGlobalRgb( [ getR(), getG(), getB(), a / 100 ] );

    return (
        <div class={ `${ style.palette } ${ style.rgb }` } style={ props.style }>
            <div class={ style.ribbon }>
                <Ribbon class={ "red" } name={ "Red" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getR } setValue={ setR }/>
            </div>
            <div class={ style.ribbon }>
                <Ribbon class={ "green" } name={ "Green" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getG } setValue={ setG }/>
            </div>
            <div class={ style.ribbon }>
                <Ribbon class={ "blue" } name={ "Blue" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getB } setValue={ setB }/>
            </div>
            <div class={ style.ribbon }>
                <Ribbon class={ "alpha" } name={ "Alpha" } minimum={ 0 } maximum={ 100 } unit={ "%" } getValue={ getA } setValue={ setA }/>
            </div>
        </div>
    );

}

function Hsl ( props ) {

    const getH = _ => Math.round( getGlobalHsl()[ 0 ] );
    const getS = _ => Math.round( getGlobalHsl()[ 1 ] * 100 );
    const getL = _ => Math.round( getGlobalHsl()[ 2 ] * 100 );
    const getA = _ => Math.round( getGlobalHsl()[ 3 ] * 100 );

    const setH = h => setGlobalHsl( [ h, getS() / 100, getL() / 100, getA() / 100 ] );
    const setA = a => setGlobalHsl( [ getH(), getS() / 100, getL() / 100, a / 100 ] );

    const getSL = _ => [ getS(), getL() ];
    const setSL = sl => setGlobalHsl( [ getH(), sl[ 0 ] / 100, sl[ 1 ] / 100, getA() / 100 ] );

    return (
        <div class={ `${ style.palette } ${ style.hsl }` } style={ props.style }>
            <div class={ style.wheel }>
                <Wheel name={ "Hue" } getValue={ getH } setValue={ setH }/>
            </div>
            <div class={ style.cartesian }>
                <Cartesian names={ [ "Saturation", "Lightness" ] } getValues={ getSL } setValues={ setSL }/>
            </div>
            <div class={ style.ribbon }>
                <Ribbon class={ "alpha" } name={ "Alpha" } minimum={ 0 } maximum={ 100 } unit={ "%" } getValue={ getA } setValue={ setA }/>
            </div>
        </div>
    );

}

/* -------------------------------------------------------------------------------------------- */
export { Palette };
