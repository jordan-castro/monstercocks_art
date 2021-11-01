/**
 * Hacemos un string mas pequeno.
 * 
 * @param str
 * string, el string para hacer short.
 * 
 * @param max
 * number, el max que puede ser el string.
 * 
 * @param removeHttp
 * boolean, si queremos quitar el http.
 * 
 * @retusn `string` 
 */
export default function shortenString(str: string, max: number, removeHttp?: boolean): string {
    // Si queremos quitar el http.
    if (removeHttp) {
        str = str.replace(/^https?\:\/\//i, '');
    }
    
    // Si el length es mas de mex, cortamos el string.
    if (str && (str.length > max)) {
        return str.substring(0, max) + '...';
    }
    // Entonces esta bien.
    return str;
}

/**
 * Hacemos un address mas corto.
 * 
 * @param address 
 * string, el address a cortar
 * 
 * @returns `string` 
 */
export const shortenAddress = (address: string): string => {
    // Empecamos a 0
    const start = 0;

    const amountToKeep = 10;
    const amountDiv = amountToKeep / 2;
    
    // Terminamos a su vaina
    const end = address ? address.length : 0;

    // Creamos los subs
    const sub1 = address ? address.substring(start, (start + amountDiv)) : '...';
    const sub2 = address ? address.substring((end - amountDiv), end) : '...';

    return `${sub1}...${sub2}`;
}