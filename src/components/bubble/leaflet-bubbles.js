import L from 'leaflet';

import Bubbles from './Bubbles';
import GrapgLayer from '../graph/leaflet-graph';

L.BubbleLayer = L.GraphLayer.extend({

    //region -- privite --

    _initGraph: function () {
        this._graph = new Bubbles(this._canvas, this._options);
    },

    _redraw: function () {
        let map = this._map;
        if (!map) {
            return;
        }

        var size = this._map.getSize(),
            bounds = new L.Bounds(L.point([0, 0]), size);

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

L.bubbleLayer = function (options) {
    return new L.BubbleLayer(options);
};
