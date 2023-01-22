/**
 * 参考：https://easings.net/
 */

/**
 * easeOutExpo。
 * @param { number } x - 值域为[0, 1]的浮点数，代表自变量。
 * @returns { number } - 因变量。
 */
function easeOutExpo ( x ) {

    return x === 1 ? 1 : 1 - Math.pow( 2, - 10 * x );

}

export { easeOutExpo };
