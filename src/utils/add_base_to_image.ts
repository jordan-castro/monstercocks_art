import { MCK_BASE } from "./globals";

/**
 * Function para crear un address sobre el path pasado.
 * 
 * @param {string?} path 
 * 
 * @returns {string}
 */
export function addBaseToImage(path?: string, removeSlash=true): string {
    // Chequea no es undifined
    if (path === undefined) {
        return "";
    }
    let base = MCK_BASE;
    if (removeSlash) {
        // Quitamos solo el ultimo slash
        base.replace(/\/$/, "");
    }

    // Regresa con path
    return base + path;
}