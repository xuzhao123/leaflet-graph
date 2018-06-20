import Color from '../../core/Color';

import Graph from '../graph/Graph';

export default class Bubbles extends Graph {
    constructor(canvas, options) {
        super(canvas, options);
    }

    /**
    * 合并配置项
    * @private
    */
    _merge() {

    }

    /**
     * 内部绘制
     * @param data
     * @private
     */
    _draw(data) {
        let ctx = this._ctx;
        var r = this._percentage * data.radius;
        let grd = ctx.createRadialGradient(data.x, data.y, 0, data.x, data.y, r);
        var color = Color.parse(data.color);
        grd.addColorStop(0, Color.clone(color).withAlpha(0).toRGBA());
        grd.addColorStop(1, Color.clone(color).withAlphaRatio(0.7).toRGBA());
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(data.x, data.y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    /**
     * 释放
     */
    dispose() {
        this._dispose();
    }
};