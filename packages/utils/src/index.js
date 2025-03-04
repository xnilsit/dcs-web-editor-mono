import * as MGRS from '../lib/mgrs';
import { convertDistance, getDistance, getRhumbLineBearing } from 'geolib';
export function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}
function toDegreesMinutesAndSeconds(coordinate) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toPrecision(4);
    return degrees + "° " + minutes + "' " + seconds;
}
function toDegreesMinutesShort(coordinate, longitude = false) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    return degrees.toString().padStart(longitude ? 3 : 2, '0') + minutes.toString().padStart(2, '0');
}
function toDegreesMinutes(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = minutesNotTruncated.toFixed(4);
    return degrees + "° " + minutes + "'";
}
export function convertDMS(lat, lon) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = toDegreesMinutesAndSeconds(lon);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
}
// returns i.e. 4210N04228E
export function convertDMshort(lat, lon) {
    var latitude = toDegreesMinutesShort(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = toDegreesMinutesShort(lon, true);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return latitude + latitudeCardinal + longitude + longitudeCardinal;
}
export function convertDMM(lat, lon) {
    var latitude = toDegreesMinutes(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = toDegreesMinutes(lon);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
}
export function toHHMMSS(s) {
    const date = new Date(0);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().slice(11, 19);
}
export function LLtoAll(lat, lon) {
    return {
        MGRS: MGRS.forward([lon, lat], 5),
        DMS: convertDMS(lat, lon),
        DMM: convertDMM(lat, lon),
    };
}
export function LLtoMGRS(lat, lon) {
    return MGRS.forward([lon, lat], 5);
}
export function calcBearing(start, end) {
    const a = {
        latitude: start.lat,
        longitude: start.lon,
    };
    const b = {
        latitude: end.lat,
        longitude: end.lon,
    };
    return getRhumbLineBearing(a, b);
}
export function calcDistance(start, end) {
    const a = {
        latitude: start.lat,
        longitude: start.lon,
    };
    const b = {
        latitude: end.lat,
        longitude: end.lon,
    };
    return convertDistance(getDistance(a, b), 'sm');
}
export const M_TO_FEET = 3.28084;
export const M_TO_NM = 0.000539957;
export const MS_TO_KTS = 1.94384;
export function msToKts(metersPerSecond = 0) {
    return (metersPerSecond * MS_TO_KTS).toFixed(0);
}
export function toFeet(meters = 0) {
    return (meters * M_TO_FEET).toFixed(0);
}
export function toNm(meters = 0) {
    return (meters * M_TO_NM).toFixed(1);
}
export function toDeg(rad = 0) {
    return (rad / (Math.PI / 180)).toFixed(0);
}
export function toRad(deg = 0) {
    return (deg * (Math.PI / 180));
}
export function rgbToInt(r, g, b) {
    return (r * 255 << 16) + (g * 255 << 8) + (b * 255);
}
export function toRgba(r, g, b, a) {
    return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${Math.round(a * 255)})`;
}
function componentToHex(c) {
    var hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
export function rgbaToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}
export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function hexaToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b, a) {
        return r + r + g + g + b + b + a + a;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: parseInt(result[4], 16),
    } : null;
}
export const MORSE = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
    'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
    'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
    'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
    'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
    'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
    'y': '-.--', 'z': '--..', ' ': '/',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----',
};
export const truncateString = (string = '', maxLength = 50) => string.length > maxLength
    ? `${string.substring(0, maxLength)}…`
    : string;
export function downloadJson(json, name) {
    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    downloadBlob(url, `${name}.json`);
}
export function downloadBlob(url, fileName) {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: false,
        shiftKey: false,
    });
    link.dispatchEvent(event);
}
// safely handles circular references
// JSON.safeStringify = (obj, indent = 2) => {
//   let cache = [];
//   const retVal = JSON.stringify(
//     obj,
//     (key, value) =>
//       typeof value === "object" && value !== null
//         ? cache.includes(value)
//           ? undefined // Duplicate reference found, discard key
//           : cache.push(value) && value // Store value in our collection
//         : value,
//     indent
//   );
//   cache = null;
//   return retVal;
// };
