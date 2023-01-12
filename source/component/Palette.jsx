/* -------------------------------------------------------------------------------------------- */
import style from "./palette.module.css";

import { Switch, Match } from "solid-js";
import { Ribbon } from "./component/Ribbon";
import { Wheel } from "./component/Wheel";
import { Cartesian } from "./component/Cartesian";
import { getGlobalHex, getGlobalRgb, getGlobalHsl, setGlobalHex, setGlobalRgb, setGlobalHsl } from "../color/color";

/**
 * Palette组件构造器。
 * @param { Object } props - 参数字典。
 * @param { string } props.format - 颜色格式，仅限于"hex"、"rgb"、"hsl"中的一种。
 * @returns { JSX } - Palette组件。
 */
function Palette ( props ) {

    return (
        <Switch>
            <Match when={ props.format === "hex" }>
                <Hex/>
            </Match>
            <Match when={ props.format === "rgb" }>
                <Rgb/>
            </Match>
            <Match when={ props.format === "hsl" }>
                <Hsl/>
            </Match>
        </Switch>
    );

}

function Hex () {

    const getR = _ => getGlobalHex()[ 0 ];
    const getG = _ => getGlobalHex()[ 1 ];
    const getB = _ => getGlobalHex()[ 2 ];
    const getA = _ => getGlobalHex()[ 3 ];

    const setR = r => setGlobalHex( [ r, getG(), getB(), getA() ] );
    const setG = g => setGlobalHex( [ getR(), g, getB(), getA() ] );
    const setB = b => setGlobalHex( [ getR(), getG(), b, getA() ] );
    const setA = a => setGlobalHex( [ getR(), getG(), getB(), a ] );

    return (
        <div class={ style.palette }>
            <Ribbon class={ "red" } name={ "Red" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getR } setValue={ setR }/>
            <Ribbon class={ "green" } name={ "Green" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getG } setValue={ setG }/>
            <Ribbon class={ "blue" } name={ "Blue" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getB } setValue={ setB }/>
            <Ribbon class={ "alpha" } name={ "Alpha" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getA } setValue={ setA }/>
        </div>
    );

}

function Rgb () {

    const getR = _ => Math.round( getGlobalRgb()[ 0 ] );
    const getG = _ => Math.round( getGlobalRgb()[ 1 ] );
    const getB = _ => Math.round( getGlobalRgb()[ 2 ] );
    const getA = _ => Math.round( getGlobalRgb()[ 3 ] * 100 );

    const setR = r => setGlobalRgb( [ r, getG(), getB(), getA() / 100 ] );
    const setG = g => setGlobalRgb( [ getR(), g, getB(), getA() / 100 ] );
    const setB = b => setGlobalRgb( [ getR(), getG(), b, getA() / 100 ] );
    const setA = a => setGlobalRgb( [ getR(), getG(), getB(), a / 100 ] );

    return (
        <div class={ style.palette }>
            <Ribbon class={ "red" } name={ "Red" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getR } setValue={ setR }/>
            <Ribbon class={ "green" } name={ "Green" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getG } setValue={ setG }/>
            <Ribbon class={ "blue" } name={ "Blue" } minimum={ 0 } maximum={ 255 } unit={ "" } getValue={ getB } setValue={ setB }/>
            <Ribbon class={ "alpha" } name={ "Alpha" } minimum={ 0 } maximum={ 100 } unit={ "%" } getValue={ getA } setValue={ setA }/>
        </div>
    );

}

function Hsl () {

    const getH = _ => Math.round( getGlobalHsl()[ 0 ] );
    const getS = _ => Math.round( getGlobalHsl()[ 1 ] * 100 );
    const getL = _ => Math.round( getGlobalHsl()[ 2 ] * 100 );
    const getA = _ => Math.round( getGlobalHsl()[ 3 ] * 100 );

    const setH = h => setGlobalHsl( [ h, getS() / 100, getL() / 100, getA() / 100 ] );
    const setS = s => setGlobalHsl( [ getH(), s / 100, getL() / 100, getA() / 100 ] );
    const setL = l => setGlobalHsl( [ getH(), getS() / 100, l / 100, getA() / 100 ] );
    const setA = a => setGlobalHsl( [ getH(), getS() / 100, getL() / 100, a / 100 ] );

    const getSL = _ => [ getS(), getL() ];
    const setSL = sl => setGlobalHsl( [ getH(), sl[ 0 ] / 100, sl[ 1 ] / 100, getA() / 100 ] );

    return (
        <div class={ style.palette }>
            <Cartesian names={ [ "saturation", "lightness" ] } getValues={ getSL } setValues={ setSL }/>
            <Wheel name={ "Hue" } getValue={ getH } setValue={ setH }/>
            <Ribbon class={ "alpha" } name={ "Alpha" } minimum={ 0 } maximum={ 100 } unit={ "%" } getValue={ getA } setValue={ setA }/>
        </div>
    );

}

/* -------------------------------------------------------------------------------------------- */
export { Palette };
