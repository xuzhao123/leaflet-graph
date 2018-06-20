var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2
});
var tileLayer = L.tileLayer('./map/{z}/{x}/{y}.png', {
    tms: true
});
tileLayer.addTo(map);

var bubbleLayer = L.bubbleLayer({
    repeat: true,
    duration: 1000,
});
bubbleLayer.addTo(map);

function resume() {
    bubbleLayer._graph.resume();
}

function pause() {
    bubbleLayer._graph.pause();
}

var idIndex = 0;
function getData() {
    var lon = Math.random() * 100;
    var lat = Math.random() * 100;

    return {
        //id: idIndex++,
        lon: lon,
        lat: lat,
        radius: 100,
        color: 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',1)'
    }
}

var data = [];
for (var i = 0; i < 10; i++) {
    data.push(getData())
}

bubbleLayer.data(data);