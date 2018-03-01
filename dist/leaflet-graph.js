(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("L"));
	else if(typeof define === 'function' && define.amd)
		define(["L"], factory);
	else if(typeof exports === 'object')
		exports["leaflet-graph"] = factory(require("L"));
	else
		root["leaflet-graph"] = factory(root["L"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultValue;
function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
        return a;
    }
    return b;
}

defaultValue.EMPTY_OBJECT = {};

defaultValue.EMPTY_FUNCTION = function () {
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inherit;
Object.create = Object.create || (function () {
        function F() {
        }

        return function (obj) {
            F.prototype = obj;
            return new F();
        }
    })();

function inherit(subClass, baseClass) {
    var subClassProto = subClass.prototype;

    subClass.prototype = Object.create(baseClass.prototype);

    for (var key in subClassProto) {
        subClass.prototype[key] = subClassProto[key];
    }
    subClass.prototype.constructor = subClass;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Graph; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation_Animation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_defaultValue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_defined__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_guid__ = __webpack_require__(12);





let Graph = function (canvas, options) {
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

    this._animation = new __WEBPACK_IMPORTED_MODULE_0__animation_Animation__["a" /* Animation */]({
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
        this._options = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options, {});

        /**
         * 重复
         */
        this._options.repeat = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options.repeat, false);

        /**
         * 持续时间
         */
        this._options.duration = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options.duration, 1000);
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
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__core_defined__["a" /* defined */])(d.id)) {
            d.id = Object(__WEBPACK_IMPORTED_MODULE_3__core_guid__["a" /* guid */])();
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
            let id = Object(__WEBPACK_IMPORTED_MODULE_2__core_defined__["a" /* defined */])(d.id) ? d.id : Object(__WEBPACK_IMPORTED_MODULE_3__core_guid__["a" /* guid */])();
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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_createCanvas__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_defaultValue__ = __webpack_require__(1);





__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.GraphLayer = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Layer.extend({

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

        this._options = Object(__WEBPACK_IMPORTED_MODULE_2__core_defaultValue__["a" /* defaultValue */])(options, __WEBPACK_IMPORTED_MODULE_2__core_defaultValue__["a" /* defaultValue */].EMPTY_OBJECT);
    },

    onAdd: function (map) {
        this._map = map;

        if (!this._canvas) {
            this._canvas = Object(__WEBPACK_IMPORTED_MODULE_1__core_createCanvas__["a" /* createCanvas */])(map);
        }

        map.getPanes().overlayPane.appendChild(this._canvas);

        map.on('move', this._reset, this);

        //map.on('movestart', this._moveStart, this);
        //map.on('moveend', this._moveEnd, this);

        if (map.options.zoomAnimation && __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Browser.any3d) {
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
        __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Util.cancelAnimFrame(this._frame);
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
        __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.setPosition(this._canvas, topLeft);

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

        if (__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.setTransform) {
            __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.setTransform(this._canvas, offset, scale);
        } else {
            this._canvas.style[__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.TRANSFORM] = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    },

    //endregion

    redraw: function () {
        if (this._graph && !this._frame && this._map && !this._map._animating) {
            this._frame = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Util.requestAnimFrame(this._redraw, this);
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

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color; });
var kCSSColorTable = {
    'transparent': [0, 0, 0, 0], 'aliceblue': [240, 248, 255, 1],
    'antiquewhite': [250, 235, 215, 1], 'aqua': [0, 255, 255, 1],
    'aquamarine': [127, 255, 212, 1], 'azure': [240, 255, 255, 1],
    'beige': [245, 245, 220, 1], 'bisque': [255, 228, 196, 1],
    'black': [0, 0, 0, 1], 'blanchedalmond': [255, 235, 205, 1],
    'blue': [0, 0, 255, 1], 'blueviolet': [138, 43, 226, 1],
    'brown': [165, 42, 42, 1], 'burlywood': [222, 184, 135, 1],
    'cadetblue': [95, 158, 160, 1], 'chartreuse': [127, 255, 0, 1],
    'chocolate': [210, 105, 30, 1], 'coral': [255, 127, 80, 1],
    'cornflowerblue': [100, 149, 237, 1], 'cornsilk': [255, 248, 220, 1],
    'crimson': [220, 20, 60, 1], 'cyan': [0, 255, 255, 1],
    'darkblue': [0, 0, 139, 1], 'darkcyan': [0, 139, 139, 1],
    'darkgoldenrod': [184, 134, 11, 1], 'darkgray': [169, 169, 169, 1],
    'darkgreen': [0, 100, 0, 1], 'darkgrey': [169, 169, 169, 1],
    'darkkhaki': [189, 183, 107, 1], 'darkmagenta': [139, 0, 139, 1],
    'darkolivegreen': [85, 107, 47, 1], 'darkorange': [255, 140, 0, 1],
    'darkorchid': [153, 50, 204, 1], 'darkred': [139, 0, 0, 1],
    'darksalmon': [233, 150, 122, 1], 'darkseagreen': [143, 188, 143, 1],
    'darkslateblue': [72, 61, 139, 1], 'darkslategray': [47, 79, 79, 1],
    'darkslategrey': [47, 79, 79, 1], 'darkturquoise': [0, 206, 209, 1],
    'darkviolet': [148, 0, 211, 1], 'deeppink': [255, 20, 147, 1],
    'deepskyblue': [0, 191, 255, 1], 'dimgray': [105, 105, 105, 1],
    'dimgrey': [105, 105, 105, 1], 'dodgerblue': [30, 144, 255, 1],
    'firebrick': [178, 34, 34, 1], 'floralwhite': [255, 250, 240, 1],
    'forestgreen': [34, 139, 34, 1], 'fuchsia': [255, 0, 255, 1],
    'gainsboro': [220, 220, 220, 1], 'ghostwhite': [248, 248, 255, 1],
    'gold': [255, 215, 0, 1], 'goldenrod': [218, 165, 32, 1],
    'gray': [128, 128, 128, 1], 'green': [0, 128, 0, 1],
    'greenyellow': [173, 255, 47, 1], 'grey': [128, 128, 128, 1],
    'honeydew': [240, 255, 240, 1], 'hotpink': [255, 105, 180, 1],
    'indianred': [205, 92, 92, 1], 'indigo': [75, 0, 130, 1],
    'ivory': [255, 255, 240, 1], 'khaki': [240, 230, 140, 1],
    'lavender': [230, 230, 250, 1], 'lavenderblush': [255, 240, 245, 1],
    'lawngreen': [124, 252, 0, 1], 'lemonchiffon': [255, 250, 205, 1],
    'lightblue': [173, 216, 230, 1], 'lightcoral': [240, 128, 128, 1],
    'lightcyan': [224, 255, 255, 1], 'lightgoldenrodyellow': [250, 250, 210, 1],
    'lightgray': [211, 211, 211, 1], 'lightgreen': [144, 238, 144, 1],
    'lightgrey': [211, 211, 211, 1], 'lightpink': [255, 182, 193, 1],
    'lightsalmon': [255, 160, 122, 1], 'lightseagreen': [32, 178, 170, 1],
    'lightskyblue': [135, 206, 250, 1], 'lightslategray': [119, 136, 153, 1],
    'lightslategrey': [119, 136, 153, 1], 'lightsteelblue': [176, 196, 222, 1],
    'lightyellow': [255, 255, 224, 1], 'lime': [0, 255, 0, 1],
    'limegreen': [50, 205, 50, 1], 'linen': [250, 240, 230, 1],
    'magenta': [255, 0, 255, 1], 'maroon': [128, 0, 0, 1],
    'mediumaquamarine': [102, 205, 170, 1], 'mediumblue': [0, 0, 205, 1],
    'mediumorchid': [186, 85, 211, 1], 'mediumpurple': [147, 112, 219, 1],
    'mediumseagreen': [60, 179, 113, 1], 'mediumslateblue': [123, 104, 238, 1],
    'mediumspringgreen': [0, 250, 154, 1], 'mediumturquoise': [72, 209, 204, 1],
    'mediumvioletred': [199, 21, 133, 1], 'midnightblue': [25, 25, 112, 1],
    'mintcream': [245, 255, 250, 1], 'mistyrose': [255, 228, 225, 1],
    'moccasin': [255, 228, 181, 1], 'navajowhite': [255, 222, 173, 1],
    'navy': [0, 0, 128, 1], 'oldlace': [253, 245, 230, 1],
    'olive': [128, 128, 0, 1], 'olivedrab': [107, 142, 35, 1],
    'orange': [255, 165, 0, 1], 'orangered': [255, 69, 0, 1],
    'orchid': [218, 112, 214, 1], 'palegoldenrod': [238, 232, 170, 1],
    'palegreen': [152, 251, 152, 1], 'paleturquoise': [175, 238, 238, 1],
    'palevioletred': [219, 112, 147, 1], 'papayawhip': [255, 239, 213, 1],
    'peachpuff': [255, 218, 185, 1], 'peru': [205, 133, 63, 1],
    'pink': [255, 192, 203, 1], 'plum': [221, 160, 221, 1],
    'powderblue': [176, 224, 230, 1], 'purple': [128, 0, 128, 1],
    'red': [255, 0, 0, 1], 'rosybrown': [188, 143, 143, 1],
    'royalblue': [65, 105, 225, 1], 'saddlebrown': [139, 69, 19, 1],
    'salmon': [250, 128, 114, 1], 'sandybrown': [244, 164, 96, 1],
    'seagreen': [46, 139, 87, 1], 'seashell': [255, 245, 238, 1],
    'sienna': [160, 82, 45, 1], 'silver': [192, 192, 192, 1],
    'skyblue': [135, 206, 235, 1], 'slateblue': [106, 90, 205, 1],
    'slategray': [112, 128, 144, 1], 'slategrey': [112, 128, 144, 1],
    'snow': [255, 250, 250, 1], 'springgreen': [0, 255, 127, 1],
    'steelblue': [70, 130, 180, 1], 'tan': [210, 180, 140, 1],
    'teal': [0, 128, 128, 1], 'thistle': [216, 191, 216, 1],
    'tomato': [255, 99, 71, 1], 'turquoise': [64, 224, 208, 1],
    'violet': [238, 130, 238, 1], 'wheat': [245, 222, 179, 1],
    'white': [255, 255, 255, 1], 'whitesmoke': [245, 245, 245, 1],
    'yellow': [255, 255, 0, 1], 'yellowgreen': [154, 205, 50, 1]
};

function clampCssByte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) {  // Clamp to integer 0 .. 360.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) {  // int or percentage.
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssByte(parseFloat(str) / 100 * 255);
    }
    return clampCssByte(parseInt(str, 10));
}

function parseCssFloat(str) {  // float or percentage.
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssFloat(parseFloat(str) / 100);
    }
    return clampCssFloat(parseFloat(str));
}

function cssHueToRgb(m1, m2, h) {
    if (h < 0) {
        h += 1;
    }
    else if (h > 1) {
        h -= 1;
    }

    if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
        return m2;
    }
    if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
}

function hsla2rgba(hsla) {
    var h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
    // NOTE(deanm): According to the CSS spec s/l should only be
    // percentages, but we don't bother and let float or percentage.
    var s = parseCssFloat(hsla[1]);
    var l = parseCssFloat(hsla[2]);
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;

    var rgba = [
        clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255),
        clampCssByte(cssHueToRgb(m1, m2, h) * 255),
        clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255)
    ];

    if (hsla.length === 4) {
        rgba[3] = hsla[3];
    }

    return rgba;
}

function parseColor(colorStr) {
    if (!colorStr) {
        return;
    }
    // colorStr in a Object with r,g,b,a
    if (typeof colorStr == 'object') {
        var r = colorStr.r,
            g = colorStr.g,
            b = colorStr.b,
            a = colorStr.a;
        return [r, g, b, a];
    }

    // colorStr may be not string
    colorStr = colorStr + '';
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = colorStr.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) {
        return kCSSColorTable[str].slice();  // dup.
    }

    // #abc and #abc123 syntax.
    if (str.charAt(0) === '#') {
        if (str.length === 4) {
            var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xfff)) {
                return;  // Covers NaN.
            }
            return [
                ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
                (iv & 0xf0) | ((iv & 0xf0) >> 4),
                (iv & 0xf) | ((iv & 0xf) << 4),
                1
            ];
        }
        else if (str.length === 7) {
            var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xffffff)) {
                return;  // Covers NaN.
            }
            return [
                (iv & 0xff0000) >> 16,
                (iv & 0xff00) >> 8,
                iv & 0xff,
                1
            ];
        }
        else if (str.length === 9) {
            var al = parseInt(str.substr(1, 2), 16) / 255;

            var iv = parseInt(str.substr(3), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xffffff)) {
                return;  // Covers NaN.
            }
            return [
                (iv & 0xff0000) >> 16,
                (iv & 0xff00) >> 8,
                iv & 0xff,
                al
            ];
        }

        return;
    }
    var op = str.indexOf('('), ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1;  // To allow case fallthrough.
        switch (fname) {
            case 'rgba':
                if (params.length !== 4) {
                    return;
                }
                alpha = parseCssFloat(params.pop()); // jshint ignore:line
            // Fall through.
            case 'rgb':
                if (params.length !== 3) {
                    return;
                }
                return [
                    parseCssInt(params[0]),
                    parseCssInt(params[1]),
                    parseCssInt(params[2]),
                    alpha
                ];
            case 'hsla':
                if (params.length !== 4) {
                    return;
                }
                params[3] = parseCssFloat(params[3]);
                return hsla2rgba(params);
            case 'hsl':
                if (params.length !== 3) {
                    return;
                }
                return hsla2rgba(params);
            default:
                return;
        }
    }

    return;
}

function stringify(arrColor, type) {
    type = type || 'rgba';
    var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];
    if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
        colorStr += ',' + arrColor[3];
    }
    return type + '(' + colorStr + ')';
}


function Color(r, g, b, a) {
    if (Object.prototype.toString.call(r) == '[object Array]') {
        this.r = r[0];
        this.g = r[1];
        this.b = r[2];
        this.a = r[3];
    } else {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    this.r = this.r == null ? 255 : this.r;
    this.g = this.g == null ? 255 : this.g;
    this.b = this.b == null ? 255 : this.b;
    this.a = this.a == null ? 1 : this.a;
}

Color.prototype.toArray = function () {
    return [this.r, this.g, this.b, this.a];
};

Color.prototype.toRGBA = function () {
    var arrColor = this.toArray();
    return stringify(arrColor, 'rgba');
};

Color.prototype.toRGB = function () {
    var arrColor = this.toArray();
    return stringify(arrColor, 'rgb');
};

Color.prototype.withAlpha = function (alpha) {
    this.a = alpha;
    return this;
};

Color.prototype.withAlphaRatio = function (ratio) {
    this.a *= ratio;
    return this;
};

Color.parse = function (colorStr) {
    var arrColor = parseColor(colorStr),
        color = new Color(arrColor);

    return color;
};

Color.clone = function (color) {
    return new Color(color.r, color.g, color.b, color.a);
};







/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_bubble_leaflet_bubbles__ = __webpack_require__(7);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_point_leaflet_points__ = __webpack_require__(14);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_image_leaflet_images__ = __webpack_require__(16);
/* empty harmony namespace reexport */





/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bubbles__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph_leaflet_graph__ = __webpack_require__(4);







__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.BubbleLayer = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.GraphLayer.extend({

    //region -- privite --

    _initGraph: function () {
        this._graph = new __WEBPACK_IMPORTED_MODULE_1__Bubbles__["a" /* Bubbles */](this._canvas, this._options);
    },

    _redraw: function () {
        let map = this._map;
        if (!map) {
            return;
        }

        var size = this._map.getSize(),
            bounds = new __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Bounds(__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.point([0, 0]), size);

        var data = [];
        for (var i = 0, len = this._data.length; i < len; i++) {
            var p = this._data[i];

            var point = this._map.latLngToContainerPoint([p.lat, p.lon]);
            if (bounds.contains(point)) {
                var d = {
                    id: p.id,
                    x: point.x,
                    y: point.y,
                    radius: p.radius,
                    color: p.color
                };
                data.push(d);
            }
        }

        this._graph.data(data);
        this._graph.refresh();
        this._frame = null;
    },

    //endregion
});

__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.bubbleLayer = function (options) {
    return new __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.BubbleLayer(options);
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bubbles; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Color__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_inherit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph_Graph__ = __webpack_require__(3);





let Bubbles = function (canvas, options) {
    __WEBPACK_IMPORTED_MODULE_2__graph_Graph__["a" /* Graph */].apply(this, arguments);
};

Bubbles.prototype = {

    /**
     * 合并配置项
     * @private
     */
    _merge: function () {

    },

    /**
     * 内部绘制
     * @param data
     * @private
     */
    _draw: function (data) {
        let ctx = this._ctx;
        var r = this._percentage * data.radius;
        let grd = ctx.createRadialGradient(data.x, data.y, 0, data.x, data.y, r);
        var color = __WEBPACK_IMPORTED_MODULE_0__core_Color__["a" /* Color */].parse(data.color);
        grd.addColorStop(0, __WEBPACK_IMPORTED_MODULE_0__core_Color__["a" /* Color */].clone(color).withAlpha(0).toRGBA());
        grd.addColorStop(1, __WEBPACK_IMPORTED_MODULE_0__core_Color__["a" /* Color */].clone(color).withAlphaRatio(0.7).toRGBA());
        ctx.fillStyle = grd;
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

Object(__WEBPACK_IMPORTED_MODULE_1__core_inherit__["a" /* inherit */])(Bubbles, __WEBPACK_IMPORTED_MODULE_2__graph_Graph__["a" /* Graph */]);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Animation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_defaultValue__ = __webpack_require__(1);



let Animation = function (options) {

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
        options = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options, __WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */].EMPTY_OBJECT);

        /**
         * 帧行为
         * @type {function}
         * @private
         */
        this._frame = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options.frame, __WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */].EMPTY_FUNCTION);

        /**
         * 持续时间
         * @type {Number}
         * @private
         */
        this._duration = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options.duration, 1000);

        /**
         * 是否循环
         * @type {Number}
         * @private
         */
        this._repeat = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options.repeat, false);
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
                Object(__WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame__["a" /* requestAnimationFrame */])(step);
                if (this._type === Animation.Type.Run && this._needRefresh) {
                    this._update();
                }
            }
        }

        step = step.bind(this);

        Object(__WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame__["a" /* requestAnimationFrame */])(step);

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

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return requestAnimationFrame; });
let requestAnimationFrame =
    (typeof window !== 'undefined' && (window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame))
    || function (func) {
        setTimeout(func, 16);
    };



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defined;
function defined(value) {
    return value !== undefined && value !== null;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = guid;
let idStart = 0x0907;

function guid() {
    return idStart+++'';
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createCanvas;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);


function createCanvas(map) {
    let canvas = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.create('canvas', 'leaflet-point-layer leaflet-layer');

    let originProp = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
    canvas.style[originProp] = '50% 50%';

    let size = map.getSize();
    canvas.width = size.x;
    canvas.height = size.y;

    let animated = map.options.zoomAnimation && __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Browser.any3d;
    __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

    return canvas;
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Points__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph_leaflet_graph__ = __webpack_require__(4);







__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.PointLayer = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.GraphLayer.extend({

    //region -- privite --

    _initGraph: function () {
        this._graph = new __WEBPACK_IMPORTED_MODULE_1__Points__["a" /* Points */](this._canvas, this._options);
    },

    _redraw: function () {
        let map = this._map;
        if (!map) {
            return;
        }

        var size = this._map.getSize(),
            bounds = new __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Bounds(__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.point([0, 0]), size);

        var data = [];
        for (var i = 0, len = this._data.length; i < len; i++) {
            var p = this._data[i];

            var point = this._map.latLngToContainerPoint([p.lat, p.lon]);
            if (bounds.contains(point)) {
                var d = {
                    id: p.id,
                    x: point.x,
                    y: point.y,
                    radius: p.radius,
                    color: p.color
                };
                data.push(d);
            }
        }

        this._graph.data(data);
        this._graph.refresh();
        this._frame = null;
    },

    //endregion
});

__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.pointLayer = function (options) {
    return new __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.PointLayer(options);
};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Points; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Color__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_inherit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_defaultValue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__graph_Graph__ = __webpack_require__(3);






let Points = function (canvas, options) {
    __WEBPACK_IMPORTED_MODULE_3__graph_Graph__["a" /* Graph */].apply(this, arguments);
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
        this._options.pointType = Object(__WEBPACK_IMPORTED_MODULE_2__core_defaultValue__["a" /* defaultValue */])(options.pointType, Points.PointType.Circle);
        this._options.images = Object(__WEBPACK_IMPORTED_MODULE_2__core_defaultValue__["a" /* defaultValue */])(options.images, []);
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

Object(__WEBPACK_IMPORTED_MODULE_1__core_inherit__["a" /* inherit */])(Points, __WEBPACK_IMPORTED_MODULE_3__graph_Graph__["a" /* Graph */]);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Images__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph_leaflet_graph__ = __webpack_require__(4);






__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.ImageLayer = __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.GraphLayer.extend({

    //region -- privite --

    _initGraph: function () {
        this._graph = new __WEBPACK_IMPORTED_MODULE_1__Images__["a" /* Images */](this._canvas, this._options);
    },

    _redraw: function () {
        let map = this._map;
        if (!map) {
            return;
        }

        var size = this._map.getSize(),
            bounds = new __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.Bounds(__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.point([0, 0]), size);

        var data = [];
        for (var i = 0, len = this._data.length; i < len; i++) {
            var p = this._data[i];

            var point = this._map.latLngToContainerPoint([p.lat, p.lon]);
            if (bounds.contains(point)) {
                var d = {
                    id: p.id,
                    x: point.x,
                    y: point.y,
                    image: p.image
                };
                data.push(d);
            }
        }

        this._graph.data(data);
        this._graph.refresh();
        this._frame = null;
    },

    //endregion
});

__WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.imageLayer = function (options) {
    return new __WEBPACK_IMPORTED_MODULE_0_leaflet___default.a.ImageLayer(options);
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Images; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inherit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_defaultValue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graph_Graph__ = __webpack_require__(3);





let Images = function (canvas, options) {
    __WEBPACK_IMPORTED_MODULE_2__graph_Graph__["a" /* Graph */].apply(this, arguments);

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
        this._options.images = Object(__WEBPACK_IMPORTED_MODULE_1__core_defaultValue__["a" /* defaultValue */])(options.images, []);
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

Object(__WEBPACK_IMPORTED_MODULE_0__core_inherit__["a" /* inherit */])(Images, __WEBPACK_IMPORTED_MODULE_2__graph_Graph__["a" /* Graph */]);

/***/ })
/******/ ]);
});
//# sourceMappingURL=leaflet-graph.js.map