import {requestAnimationFrame} from './requestAnimationFrame';
import {defaultValue} from '../core/defaultValue';

export let Animation = function (options) {

    this._type = Animation.Type.Stop;

    this._needRefresh = true;

    this._start;
    this._pause;
    this._pauseTime = 0;

    this._merge(options);
};

Animation.Type = {
    Run: 1,
    Stop: 2,
    Pause: 3
};

Animation.prototype = {

    constructor: Animation,

    _merge: function (options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * 帧行为
         * @type {function}
         * @private
         */
        this._frame = defaultValue(options.frame, defaultValue.EMPTY_FUNCTION);

        /**
         * 持续时间
         * @type {Number}
         * @private
         */
        this._duration = defaultValue(options.duration, 1000);

        /**
         * 是否循环
         * @type {Number}
         * @private
         */
        this._repeat = defaultValue(options.repeat, false);
    },

    _update: function () {
        let percentage;

        if (this._repeat) {
            let now = new Date();
            let delay = now - this._start - this._pauseTime;
            percentage = delay / this._duration - Math.floor(delay / this._duration);
        } else {
            this._needRefresh = false;
            percentage = 1;
        }

        this._frame(percentage);
    },

    _startLoop: function () {

        function step() {
            if (this._type !== Animation.Type.Stop) {
                requestAnimationFrame(step);
                if (this._type === Animation.Type.Run && this._needRefresh) {
                    this._update();
                }
            }
        }

        step = step.bind(this);

        requestAnimationFrame(step);

    },

    /**
     * 是否正在执行
     * @returns {boolean}
     */
    isRun: function () {
        return this._type === Animation.Type.Run;
    },

    /**
     * 是否暂停
     * @returns {boolean}
     */
    isPause: function () {
        return this._type === Animation.Type.Pause;
    },

    /**
     * 是否停止
     * @returns {boolean}
     */
    isStop: function () {
        return this._type === Animation.Type.Stop;
    },

    /**
     * 开始
     */
    start: function () {
        this._type = Animation.Type.Run;
        this._start = new Date();
        this._pauseTime = 0;

        this._startLoop();
    },

    /**
     * 停止
     */
    stop: function () {
        this._type = Animation.Type.Stop;
    },

    /**
     * 暂停
     */
    pause: function () {
        if (this._type !== Animation.Type.Pause) {
            this._type = Animation.Type.Pause;
            this._pause = new Date();
        }
    },

    /**
     * 恢复
     */
    resume: function () {
        if (this._type === Animation.Type.Pause) {
            this._type = Animation.Type.Run;
            this._pauseTime += new Date() - this._pause;
        }
    },

    /**
     * 释放
     */
    dispose: function () {
        this.stop();
    }
};