import L from 'leaflet';
import Images from './Images';
import GraphLayer from '../graph/leaflet-graph';


L.ImageLayer = L.GraphLayer.extend({

    //region -- privite --

    _initGraph: function () {
        this._graph = new Images(this._canvas, this._options);
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

L.imageLayer = function (options) {
    return new L.ImageLayer(options);
};
