import {Color} from '../../core/Color';
import {inherit} from '../../core/inherit';
import {defaultValue} from '../../core/defaultValue';

import {Graph} from '../graph/Graph';

export let Points = function (canvas, options) {
    Graph.apply(this, arguments);
};

Points.PointType = {
    'Circle': 'Circle',
    'Rect': 'Rect'
};

Points.prototype = {

    /**
     * 合并配置项
     * @private
     */
    _merge: function (options) {
        this._options.pointType = defaultValue(options.pointType, Points.PointType.Circle);
        this._options.images = defaultValue(options.images, []);
    },

    /**
     * 内部绘制
     * @param data
     * @private
     */
    _draw: function (data) {
        let ctx = this._ctx;
        var r = data.radius;
        ctx.fillStyle = data.color;
        ctx.beginPath();
        ctx.arc(data.x, data.y, r, 0, 2 * Math.PI);
        ctx.fill();
    },

    /**
     * 释放
     */
    dispose: function () {
        this._dispose();
    }
};

inherit(Points, Graph);