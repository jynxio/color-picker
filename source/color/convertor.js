// ============================= README ====================================
// 本文使用了CSS颜色标准4规范中的rgb()、hsl()、#hex来定义下述函数中的rgb、hsl、hex参数，
// 所以rgb、hsl、hex参数是拥有4个元素的数组，而不是3个元素的数组。
// =========================================================================


/* -------------------------------------------------------------------------------------------- */
/**
 * hex转rgb。
 * @param { number[] } hex - [red, green, blue, alpha]，其中red、green、blue、alpha是均属于[0, 255]的整数。
 * @returns { number[] } - [red, green, blue, alpha]，其中red、green、blue是均属于[0, 255]的浮点数，alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @example
 * f( [ 255, 255, 255, 255 ] ); // return [ 255, 255, 255, 1 ]
 */
function hexToRgb ( [ r, g, b, a ] ) {

    return [ r, g, b, a / 255 ];

}

/**
 * hex转hsl。
 * @param { number[] } hex - [red, green, blue, alpha]，其中red、green、blue、alpha是均属于[0, 255]的整数。
 * @returns { number[] } - [hue, saturation, lightness, alpha]，其中hue是属于[0, 360]的浮点数，saturation是属于[0, 1]的浮点数（代表[0%, 100%]），lightness是属于[0, 1]的浮点数（代表[0%, 100%]），alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @example
 * f( [ 255, 255, 255, 255 ] ); // return [ 0, 0, 1, 1 ]
 */
function hexToHsl ( [ r, g, b, a ] ) {

    const rgb = hexToRgb( [ r, g, b, a ] );
    const hsl = rgbToHsl( rgb );

    return hsl;

}

/**
 * rgb转hex。
 * @param { number[] } rgb - [red, green, blue, alpha]，其中red、green、blue是均属于[0, 255]的浮点数，alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @returns { number[] } - [red, green, blue, alpha]，其中red、green、blue、alpha是均属于[0, 255]的整数。
 * @example
 * f( [ 255, 255, 255, 1 ] ); // return [ 255, 255, 255, 255 ]
 */
function rgbToHex ( [ r, g, b, a ] ) {

    a = Math.round( a * 255 );
    a = Math.max( a, 0 );
    a = Math.min( a, 255 );

    return [ r, g, b, a ];

}

/**
 * rgb转hsl。
 * @param { number[] } rgb - [red, green, blue, alpha]，其中red、green、blue是均属于[0, 255]的浮点数，alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @returns { number[] } - [hue, saturation, lightness, alpha]，其中hue是属于[0, 360]的浮点数，saturation是属于[0, 1]的浮点数（代表[0%, 100%]），lightness是属于[0, 1]的浮点数（代表[0%, 100%]），alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @tutorial https://www.30secondsofcode.org/js/s/rgb-to-hsl
 * @tutorial https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/RGBToHSL.md
 * @example
 * f( [ 45, 23, 11, 1 ] ); // return [ 21.17647058823529, 0.6071428571428573, 0.10980392156862745, 1 ]
 */
function rgbToHsl ( [ r, g, b, a ] ) {

    r /= 255;
    g /= 255;
    b /= 255;

    const l = Math.max( r, g, b );
    const s = l - Math.min( r, g, b );
    const h = s
        ? l === r
        ? ( g - b ) / s
        : l === g
        ? 2 + ( b - r ) / s
        : 4 + ( r - g ) / s
        : 0;

    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0) / 100,
        (100 * (2 * l - s)) / 2 / 100,
        a,
    ];

}

/**
 * hsl转hex。
 * @param { number[] } hsl - [hue, saturation, lightness, alpha]，其中hue是属于[0, 360]的浮点数，saturation是属于[0, 1]的浮点数（代表[0%, 100%]），lightness是属于[0, 1]的浮点数（代表[0%, 100%]），alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @returns { number[] } - [red, green, blue, alpha]，其中red、green、blue、alpha是均属于[0, 255]的整数。
 * @example
 * f( [ 13, 1, 0.11, 1 ] ); // return [ 56, 12, 0, 255 ]
 */
function hslToHex ( [ h, s, l, a ] ) {

    const rgb = hslToRgb( [ h, s, l, a ] );

    rgb[ 0 ] = clamp( rgb[ 0 ] );
    rgb[ 1 ] = clamp( rgb[ 1 ] );
    rgb[ 2 ] = clamp( rgb[ 2 ] );
    rgb[ 3 ] = clamp( rgb[ 3 ] * 255 );

    return rgb;

    function clamp ( number ) {

        number = Math.round( number );
        number = Math.max( number, 0 );
        number = Math.min( number, 255 );

        return number;

    }

}

/**
 * hsl转rgb。
 * @tutorial https://www.30secondsofcode.org/js/s/hsl-to-rgb
 * @tutorial https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/HSLToRGB.md
 * @param { number[] } hsl - [hue, saturation, lightness, alpha]，其中hue是属于[0, 360]的浮点数，saturation是属于[0, 1]的浮点数（代表[0%, 100%]），lightness是属于[0, 1]的浮点数（代表[0%, 100%]），alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @returns { number[] } - [red, green, blue, alpha]，其中red、green、blue是均属于[0, 255]的浮点数，alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @example
 * f( [ 13, 1, 0.11, 1 ] ); // return [ 56.1, 12.155000000000006, 0, 1 ]
 */
function hslToRgb ( [ h, s, l, a ] ) {

    const k = n => ( n + h / 30 ) % 12;
    const t = s * Math.min( l, 1 - l );
    const f = n => l - t * Math.max( - 1, Math.min( k( n ) - 3, Math.min( 9 - k( n ), 1 ) ) );

    return [ 255 * f(0), 255 * f(8), 255 * f(4), a ];

}

/**
 * hex转字符串。
 * @param { number[] } hex - [red, green, blue, alpha]，其中red、green、blue、alpha是均属于[0, 255]的整数。
 * @returns { string } - 字符串。
 * @example
 * f( [ 15, 15, 15, 255 ] ); // return "0f0f0fff"
 */
function hexToString ( [ r, g, b, a ] ) {

    r = ( r <= 0xf ? "0" : "" ) + r.toString( 16 );
    g = ( g <= 0xf ? "0" : "" ) + g.toString( 16 );
    b = ( b <= 0xf ? "0" : "" ) + b.toString( 16 );
    a = ( a <= 0xf ? "0" : "" ) + a.toString( 16 );

    return r + g + b + a;

}

/**
 * rgb转字符串。
 * @param { number[] } rgb - [red, green, blue, alpha]，其中red、green、blue是均属于[0, 255]的浮点数，alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @returns { string } - 字符串。
 * @example
 * f( [ 255, 255, 255, 0.4231 ] ); // return "255 255 255 / 42%"
 */
function rgbToString ( [ r, g, b, a ] ) {

    r = Math.round( r ) + "";
    g = Math.round( g ) + "";
    b = Math.round( b ) + "";
    a = ( a * 100 ).toFixed() + "%";

    return `${ r } ${ g } ${ b } / ${ a }`;

}

/**
 * hsl转字符串。
 * @param { number[] } hsl - [hue, saturation, lightness, alpha]，其中hue是属于[0, 360]的浮点数，saturation是属于[0, 1]的浮点数（代表[0%, 100%]），lightness是属于[0, 1]的浮点数（代表[0%, 100%]），alpha是属于[0, 1]的浮点数（代表[0%, 100%]）。
 * @returns { string } - 字符串。
 * @example
 * f( [ 260, 0.5231, 0.6342, 0.2456 ] ); // return "260deg 52% 63% / 25%"
 */
function hslToString ( [ h, s, l, a ] ) {

    h = Math.round( h ) + "deg";
    s = ( s * 100 ).toFixed() + "%";
    l = ( l * 100 ).toFixed() + "%";
    a = ( a * 100 ).toFixed() + "%";

    return `${ h } ${ s } ${ l } / ${ a }`;

}

/* -------------------------------------------------------------------------------------------- */
export { hexToRgb, hexToHsl, rgbToHex, rgbToHsl, hslToHex, hslToRgb, hexToString, rgbToString, hslToString };
