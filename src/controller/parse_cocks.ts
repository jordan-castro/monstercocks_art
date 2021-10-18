import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import Abi from '../utils/abi.json';
import Attribute from '../models/attribute';
import MonsterCock from '../models/cock';

/**
 * Crea una lista de attributes sobre JSON.
 * 
 * @param cockJson 
 * JSON, el cock JSON.
 * 
 * @returns `Attribute[]`
 */
const parseAttributes = (cockJson) => {
    let attributes: Attribute[] = [];

    // Loop sobre los attributes
    for (var x = 0; x < cockJson.attributes.lenght; x++) {
        // Creamos el attribute
        var attribute = cockJson.attributes[x];
        // Un push
        attributes.push(
            new Attribute(
                attribute.type,
                attribute.value
            )
        );
    }

    return attributes;
}

/**
 * Crea un objecto de MonsterCock por una respuesta de cuerpo.
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
    
    // Los attributes
    let attributes = parseAttributes(cockJson);
    
    if (specials !== undefined) {
        cockId = specials.id;
    }

    // Regresa el MonsterCock
    return new MonsterCock(
        cockId,
        cockName,
        cockUri,
        cockImage,
        attributes
    );
}