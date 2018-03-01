import L from 'leaflet';

export function createCanvas(map) {
    let canvas = L.DomUtil.create('canvas', 'leaflet-point-layer leaflet-layer');

    let originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
    canvas.style[originProp] = '50% 50%';

    let size = map.getSize();
    canvas.width = size.x;
    canvas.height = size.y;

    let animated = map.options.zoomAnimation && L.Browser.any3d;
    L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

    return canvas;
}