/**
 *
 */
import style from "./palette.module.css";

/**
 *
 */
import { useContext, Switch, Match, createSignal, onMount } from "solid-js";

import { GlobalColorContext } from "../context/GlobalColorContext";

import { Ribbon } from "./component/Ribbon";

import { Wheel } from "./component/Wheel";

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

    const global_color = useContext( GlobalColorContext );

    const getR = _ => global_color.getHex()[ 0 ];
    const getG = _ => global_color.getHex()[ 1 ];
    const getB = _ => global_color.getHex()[ 2 ];
    const getA = _ => global_color.getHex()[ 3 ];

    const setR = r => global_color.setHex( [ r, getG(), getB(), getA() ] );
    const setG = g => global_color.setHex( [ getR(), g, getB(), getA() ] );
    const setB = b => global_color.setHex( [ getR(), getG(), b, getA() ] );
    const setA = a => global_color.setHex( [ getR(), getG(), getB(), a ] );

    return (
        <div class={ style.palette }>
            <Ribbon name={ "red" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getR() } setValue={ setR }/>
            <Ribbon name={ "green" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getG() } setValue={ setG }/>
            <Ribbon name={ "blue" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getB() } setValue={ setB }/>
            <Ribbon name={ "alpha" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getA() } setValue={ setA }/>
        </div>
    );

}

function Rgb () {

    const global_color = useContext( GlobalColorContext );

    const getR = _ => global_color.getRgb()[ 0 ];
    const getG = _ => global_color.getRgb()[ 1 ];
    const getB = _ => global_color.getRgb()[ 2 ];
    const getA = _ => global_color.getRgb()[ 3 ];

    const setR = r => global_color.setRgb( [ r, getG(), getB(), getA() ] );
    const setG = g => global_color.setRgb( [ getR(), g, getB(), getA() ] );
    const setB = b => global_color.setRgb( [ getR(), getG(), b, getA() ] );
    const setA = a => global_color.setRgb( [ getR(), getG(), getB(), a ] );

    return (
        <div class={ style.palette }>
            <Ribbon name={ "red" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getR() } setValue={ setR }/>
            <Ribbon name={ "green" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getG() } setValue={ setG }/>
            <Ribbon name={ "blue" } minimum={ 0 } maximum={ 255 } unit={ "" } value={ getB() } setValue={ setB }/>
            <Ribbon name={ "alpha" } minimum={ 0 } maximum={ 100 } unit={ "%" } value={ Math.round( getA() * 100 ) } setValue={ a => setA( a / 100 ) }/>
        </div>
    );

}

function Hsl () {

    const [ getValue, setValue ] = createSignal( 0 );

    return <Wheel value={ getValue() } setValue={ setValue }/>;

}

/**
 *
 */
export { Palette };
