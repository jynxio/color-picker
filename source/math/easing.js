/**
 * 参考：https://easings.net/
 */

/**
 * easeOutCirc。
 * @param { number } x - 值域为[0, 1]的浮点数，代表自变量。
 * @returns { number } - 因变量。
 */
function easeOutCirc ( x ) {

    return Math.sqrt( 1 - Math.pow( x - 1, 2 ) );

}

export { easeOutCirc };
