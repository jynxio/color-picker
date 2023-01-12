/**
 * 检查两个浮点数是否相等。
 * @param { number } n_1 - 第一个浮点数。
 * @param { number } n_2 - 第二个浮点数。
 * @returns { boolean } - 若相等，则返回true，否则返回false。
 */
function equal ( n_1, n_2 ) {

    return Math.abs( n_1 - n_2 ) < Number.EPSILON;

}

export { equal };
