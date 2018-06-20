import Color from '../../core/Color';
import defaultValue from '../../core/defaultValue';
import Graph from '../graph/Graph';

export default class Points extends Graph {

    constructor(canvas, options) {
        super(canvas, options);
    }

    /**
     * 合并配置项
     * @private
     */
    _merge(options) {
        this._options.pointType = defaultValue(options.pointType, Points.PointType.Circle);
        this._options.images = defaultValue(options.images, []);
    }

    /**
     * 内部绘制
     * @param data
     * @private
     */
    _draw(data) {
        let ctx = this._ctx;
        var r = data.radius;
        ctx.fillStyle = data.color;
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
}

Points.PointType = {
    'Circle': 'Circle',
    'Rect': 'Rect'
};