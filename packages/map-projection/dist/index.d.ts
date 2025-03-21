/**
 * set active DCS map / theater
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {string} mapName
 * @returns {*}
 */
export declare function activeMap(mapName: string): any;
/**
 * Mission x / y coordinates to Lat Lon
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {number} y
 * @param {number} x
 * @returns {{ lat: number; lon: number; }}
 */
export declare function mizToLL(y: number, x: number): {
    lat: any;
    lon: any;
};
/**
 * Lat Lon to DCS x y mission format
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {number} lon
 * @param {number} lat
 * @returns {{x, y}}
 */
export declare function LLToMiz(lon: number, lat: number): number[];
export declare const TimeZones: {
    Caucasus: number;
    PersianGulf: number;
    MarianaIslands: number;
    Nevada: number;
    SinaiMap: number;
    Syria: number;
    TheChannel: number;
    Normandy: number;
    Kola: number;
    Falklands: number;
    Afghanistan: number;
    Iraq: number;
    SouthEastAsia: number;
};
export { COORDINATES } from "./mapCoordinates";
export declare const mapNames: string[];
export declare function calcRotationOffset(marker: any, project: Function): number;
