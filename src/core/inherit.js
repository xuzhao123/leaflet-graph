Object.create = Object.create || (function () {
        function F() {
        }

        return function (obj) {
            F.prototype = obj;
            return new F();
        }
    })();

export function inherit(subClass, baseClass) {
    var subClassProto = subClass.prototype;

    subClass.prototype = Object.create(baseClass.prototype);

    for (var key in subClassProto) {
        subClass.prototype[key] = subClassProto[key];
    }
    subClass.prototype.constructor = subClass;
}