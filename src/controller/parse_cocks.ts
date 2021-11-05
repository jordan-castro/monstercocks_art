import Attribute from '../models/attribute';
import MonsterCock from '../models/cock';

/**
 * Crea un objecto de MonsterCock por una respuesta de JSON.
 * 
 * @param cockJson 
 * JSON, un cock en representacion JSON.
 * @param specials 
 * undefined or JSON
 * 
 * Por Ejemplo:
 * ```
 *  {
 *      id: 0
 *  }
 * ```
 * 
 * @returns `MonsterCock`
 */
export const parseCock = (cockJson, specials?) => {
    // La data
    let cockId = cockJson.tokenId;
    let cockName = cockJson.name;
    let cockUri = cockJson.uri;
    let cockImage = cockJson.image;

    if (specials !== undefined) {
        cockId = specials.id;
        cockUri = specials.uri;
    }

    // Regresa el MonsterCock
    return new MonsterCock(
        cockId,
        cockName,
        cockUri,
        cockImage
    );
}