let requestAnimationFrame =
    (typeof window !== 'undefined' && (window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame))
    || function (func) {
        setTimeout(func, 16);
    };

export default requestAnimationFrame;

