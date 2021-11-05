import Attribute from "../models/attribute";
import { MCK_BASE } from "../utils/globals";
import { API_COCK_GATEWAY, API_KEY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";

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
    for (var attribute of attributesJson) {
        // Creamos el attribute
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
 * @description Fetches attributes from the CockGateway
 * 
 * @param cockId
 * The id of the cock to fetch attributes for
 * 
 * @param {Promise<Attribute[]>} 
 */
const fetchAttributes = async (cockId: number) => {
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: 'attributes',
            p: API_KEY,
            tokenId: cockId.toString()
        }
    });

    // Chequea por errores
    if (response === false) {
        return [];
    } 

    let attributes = parseAttributes(response.data);
    return attributes;
}

export default fetchAttributes;