export function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
        return a;
    }
    return b;
}

defaultValue.EMPTY_OBJECT = {};

defaultValue.EMPTY_FUNCTION = function () {
};