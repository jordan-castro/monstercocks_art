/**
 * Convertimos unos segundos a un objecto de Date.
 * 
 * @param secs
 * number, los segundos.
 *  
 * @returns Date
 */
export default function toDateTime(secs) {
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);
    return t;
}
