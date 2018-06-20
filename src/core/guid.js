let idStart = 0x0907;

export default function guid() {
    return idStart++ + '';
}