import {inherit} from '../../core/inherit';
import {defaultValue} from '../../core/defaultValue';

import {Graph} from '../graph/Graph';

export let Images = function (canvas, options) {
    Graph.apply(this, arguments);

    /**
     * 图片缓存对象
     * @type {{}}
     * @private
     */
    this._images = {};

    this._loadImage();
};

Images.prototype = {

    /**
     * 合并配置项
     * @private
     */
    _merge: function (options) {
        this._options.images = defaultValue(options.images, []);
    },

    /**
     * 图片
     * @private
     */
    _loadImage: function () {
        var self = this;
        for (var i = 0, len = this._options.images.length; i < len; i++) {
            var imagePath = this._options.images[i],
                image = new Image();
            image.src = imagePath;
            this._images[imagePath] = image;

            (function (imagePath) {
                image.onload = function () {
                    self._images[imagePath].ready = true;
                };
            })(imagePath);
        }
    },

    /**
     * 内部绘制
     * @param data
     * @private
     */
    _draw: function (data) {
        let ctx = this._ctx;

        var image = this._images[data.image];
        let width = image.width,
            height = image.height;
        ctx.drawImage(image, data.x - width / 2, data.y - height / 2, width, height);
    },

    /**
     * 释放
     */
    dispose: function () {
        this._dispose();
    }
};

inherit(Images, Graph);