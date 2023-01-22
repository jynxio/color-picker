class Tween {

    #id;              // 动画帧函数的标识

    #is_running;      // 运行状态

    #starting_value;  // 起始值
    #ending_value;    // 终止值
    #delta_value;     // 差异值

    #elapsed_time;    // 累计时间
    #starting_time;   // 起算时间
    #duration_time;   // 持续时间

    #easing;          // 缓动函数
    #end_listener;    // 结束事件的监听器
    #update_listener; // 更新事件的监听器

    constructor () {

        this.#is_running = false;
        this.#elapsed_time = 0;

    }

    /**
     * 开始运行。
     */
    play () {

        this.#is_running = true;
        this.#starting_time = performance.now();

        const self = this;

        self.#id = requestAnimationFrame( function loop ( current_time ) {

            /*  */
            if ( self.#is_running === false ) return;
            if ( self.#elapsed_time >= self.#duration_time ) {

                self.reset();
                self.#end_listener?.();

                return;

            }

            /*  */
            self.#id = requestAnimationFrame( loop );

            /*  */
            self.#elapsed_time = current_time - self.#starting_time;

            const x = Math.min( self.#elapsed_time / self.#duration_time, 1 );
            const y = self.#easing( x );

            const current_value = self.#starting_value + self.#delta_value * y;

            self.#update_listener?.( current_value );

        } );

        return this;

    }

    /**
     * 重置为初始状态，但不运行。
     */
    reset () {

        this.#is_running = false;
        this.#elapsed_time = 0;
        this.#starting_time = undefined;

        cancelAnimationFrame( this.#id );

        this.#id = undefined;

        return this;

    }

    /**
     * 设置初始值和终止值。
     * @param { number } starting_value - 初始值。
     * @param { number } ending_value - 终止值。
     */
    fromTo ( starting_value, ending_value ) {

        this.#starting_value = starting_value;
        this.#ending_value = ending_value;
        this.#delta_value = this.#ending_value  - this.#starting_value;

        return this;

    }

    /**
     * 设置持续时间。
     * @param { number } time - 持续时间，以毫秒为单位。
     */
    setDuration ( time ) {

        this.#duration_time = time;

        return this;

    }

    /**
     * 设置缓动函数。
     * @param { Function } easing - 缓动函数。
     */
    setEasing ( easing ) {

        this.#easing = easing;

        return this;

    }

    /**
     * 设置更新事件的监听器。
     * @param { Function } handler - 监听器。
     */
    setUpdateListener ( listener ) {

        this.#update_listener = listener;

        return this;

    }

    /**
     * 设置结束事件的监听器。
     * @param { Function } handler - 监听器。
     */
    setEndListener ( listener ) {

        this.#end_listener = listener

        return this;


    }

}

export { Tween };
