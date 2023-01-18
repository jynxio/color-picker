/* -------------------------------------------------------------------------------------------- */
const KEY = "color-picker-storage";

const storage = JSON.parse( localStorage.getItem( KEY ) ) ?? {};

// TODO - 我希望它能以一种更佳简洁的方式运行，我不希望它会要求调用者主动使用set来更新storage。

globalThis.addEventListener( "unbeforeload", _ => {

    // 在该事件处理程序执行完毕之前，浏览器都不会退出当前页面，因此请不要在此进行耗时操作。
    localStorage.setItem( KEY, JSON.stringify( storage ) );

} );

/**
 * 获取当前页面的缓存数据。
 * @param { string } key - 键。
 * @returns { any } - 值，若值不存在，则返回undefined。
 */
function get ( key ) {

    return storage[ key ] ?? undefined;

}

/**
 * 更新当前页面的缓存数据。
 * @param { string } key - 键。
 * @param { any } value - 值。
 */
function set ( key, value ) {

    storage[ key ] = value;

}

/* -------------------------------------------------------------------------------------------- */
export { get, set };
