import L from 'leaflet';

import {createCanvas} from '../../core/createCanvas';
import {defaultValue} from '../../core/defaultValue';

L.GraphLayer = L.Layer.extend({

    //region -- leaflet调用 --

    initialize: function (options) {

        /**
         * 图形对象
         * @type Bubbles
         * @private
         */
        this._graph = null;

        /**
         * requestAnimationFrame对象
         * @type requestAnimationFrame
         * @private
         */
        this._frame = null;

        /**
         * 存储的数据
         * @private
         */
        this._data = [];

        this._options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    },

    onAdd: function (map) {
        this._map = map;

        if (!this._canvas) {
            this._canvas = createCanvas(map);
        }

        map.getPanes().overlayPane.appendChild(this._canvas);

        map.on('move', this._reset, this);

        //map.on('movestart', this._moveStart, this);
        //map.on('moveend', this._moveEnd, this);

        if (map.options.zoomAnimation && L.Browser.any3d) {
            map.on('zoomanim', this._animateZoom, this);
        }

        this._initGraph();
    },

    onRemove: function (map) {
        map.getPanes().overlayPane.removeChild(this._canvas);

        map.off('move', this._reset, this);

        //map.off('movestart', this._moveStart, this);
        //map.off('moveend', this._moveEnd, this);

        if (map.options.zoomAnimation) {
            map.off('zoomanim', this._animateZoom, this);
        }

        this.dispose();
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    dispose: function () {
        L.Util.cancelAnimFrame(this._frame);
        this._graph.dispose();

        this._frame = null;
        this._graph = null;
        this._data = null;
        this._options = null;
    },

    //endregion

    //region -- privite --

    /**
     * 初始化图表
     * @private
     */
    _initGraph: function () {
        throw new Error('Not implemented');
    },

    /**
     * 绘制
     * @private
     */
    _redraw: function () {
        throw new Error('Not implemented');
    },

    _reset: function () {
        let topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);

        let size = this._map.getSize();

        if (this._graph._width !== size.x) {
            this._canvas.width = this._graph._width = size.x;
        }
        if (this._graph._height !== size.y) {
            this._canvas.height = this._graph._height = size.y;
        }

        this._redraw();
    },

    _animateZoom: function (e) {
        let scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this._canvas, offset, scale);
        } else {
            this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    },

    //endregion

    redraw: function () {
        if (this._graph && !this._frame && this._map && !this._map._animating) {
            this._frame = L.Util.requestAnimFrame(this._redraw, this);
        }
        return this;
    },

    data: function (data) {
        this._data = data;
        this.redraw();
    },

    remove: function (id) {
        var data = this._data;
        for (let i = 0, len = data.length; i < len;) {
            if (data[i].id === id) {
                data.splice(i, 1);
                len--;
            } else {
                i++;
            }
        }
        this.redraw();
    },

    removeAll: function () {
        this._data.length = 0;
        this.redraw();
    }
});