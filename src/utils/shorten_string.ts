/**
 * Hacemos un string mas pequeno.
 * 
 * @param str
 * string, el string para hacer short.
 * 
 * @param max
 * number, el max que puede ser el string.
 * 
 * @retusn `string` 
 */
export default function shortenString(str: string, max: number): string {
    // Chequea si el length es menos del max
    if (str.length <= max) return str;

    // Saca el https
    if (str.includes('https://')) {
        var str = str.split('https://').join('');
    }

    // Buscamos la differencia del max
    let diff = str.length - max;
    // Make sure que la differencia es max
    while (diff > max) {
        diff -= 1;
    }

    const end = str.length - diff;

    // Ahore hacemos magica
    return str.substring(0, end) + '...';
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
    const end = address.length;

    // Creamos los subs
    const sub1 = address.substring(start, (start + amountDiv));
    const sub2 = address.substring((end - amountDiv), end);

    return `${sub1}...${sub2}`;
}