import Attribute from '../models/attribute';
import MonsterCock from '../models/cock';
import { MCK_BASE } from '../utils/globals';

/**
 * Crea una lista de attributes sobre JSON.
 * 
 * @param attributesJson 
 * JSON, el JSON de los attributos.
 * 
 * @returns `Attribute[]`
 */
const parseAttributes = (attributesJson) => {
    let attributes: Attribute[] = [];

    // Loop sobre los attributes
    for (var x = 0; x < attributesJson.length; x++) {
        // Creamos el attribute
        var attribute = attributesJson[x];
        // Un push
        attributes.push(
            new Attribute(
                attribute.type || attribute.trait_type,
                attribute.value
            )
        );
    }

    return attributes;
}

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

    let attributes: Attribute[] = [];
    // Chequea si hay attributes
    if (cockJson.attributes) {
        // Los attributes
        attributes = parseAttributes(cockJson.attributes);
    }

    if (specials !== undefined) {
        cockId = specials.id;
        cockUri = specials.uri;
    }

    // Regresa el MonsterCock
    return new MonsterCock(
        cockId,
        cockName,
        cockUri,
        MCK_BASE + cockImage,
        attributes
    );
}