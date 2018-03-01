import {Animation} from '../../animation/Animation';
import {defaultValue} from '../../core/defaultValue';
import {defined} from '../../core/defined';
import {guid} from '../../core/guid';

export let Graph = function (canvas, options) {
    let self = this;
    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._baseMerge(options);
    this._merge(options);

    /**
     * 数据
     * @private
     */
    this._data = {};

    /**
     * 百分比
     * @type {number}
     * @private
     */
    this._percentage = 0;

    this._animation = new Animation({
        frame: this.refresh.bind(this),
        repeat: this._options.repeat,
        duration: this._options.duration
    });
    this._animation.start();
};

Graph.prototype = {

    /**
     * 基类中通用的配置项合并
     * @param options
     * @private
     */
    _baseMerge: function (options) {

        /**
         * 配置项
         */
        this._options = defaultValue(options, {});

        /**
         * 重复
         */
        this._options.repeat = defaultValue(options.repeat, false);

        /**
         * 持续时间
         */
        this._options.duration = defaultValue(options.duration, 1000);
    },

    /**
     * 需要子类实现的自定义配置项合并
     * @private
     */
    _merge: function () {
        throw new Error('Not implemented');
    },

    update: function (options) {
        //todo 在运行过程中改变配置
    },

    /**
     * 增加一行数据
     * @param d
     */
    add: function (d) {
        if (!d) {
            return;
        }
        if (!defined(d.id)) {
            d.id = guid();
        }

        this._data[d.id] = d;
        this.refresh();
    },

    /**
     * 删除一行数据
     * @param id
     * @returns {boolean}
     */
    remove: function (id) {
        return delete this._data[id];
    },

    /**
     * 数据改变
     * @param data
     */
    data: function (data) {
        this._data = {};
        for (var i = 0, len = data.length; i < len; i++) {
            let d = data[i];
            let id = defined(d.id) ? d.id : guid();
            this._data[id] = d;
        }
    },

    /**
     * 暂停
     */
    pause: function () {
        this._animation.pause();
    },

    /**
     * 继续
     */
    resume: function () {
        this._animation.resume();
    },

    /**
     * 内部绘制
     * @param data
     * @private
     */
    _draw: function (data) {
        //需子类实现，绘制图形
        throw new Error('Not implemented');
    },

    /**
     * 刷新
     * @param percentage
     */
    refresh: function (percentage) {
        let ctx = this._ctx;
        ctx.clearRect(0, 0, this._width, this._height);

        if (percentage !== undefined) {
            this._percentage = percentage;
        }

        for (var id in this._data) {
            var p = this._data[id];
            this._draw(p);
        }
    },

    /**
     * 释放
     */
    _dispose: function () {
        this._animation.dispose();

        this._ctx = null;
        this._data = null;
        this._animation = null;
    },

    /**
     * 释放
     */
    dispose:function(){
        this._dispose();
        //需要子类实现自定义的释放
        throw new Error('Not implemented');
    }
};