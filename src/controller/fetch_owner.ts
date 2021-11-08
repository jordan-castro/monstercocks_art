import Owner from "../models/owner";
import { MCK_BASE } from "../utils/globals";
import { API_COCK_GATEWAY, API_KEY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";
import { validId } from "../utils/valid_id";

/**
 * Busca los owners del token.
 * 
 * @param id 
 * number, El id del token.
 * 
 * @param pageNumber
 * number?, La pagina del negro.
 * 
 * @returns Promise<[]>
 */
export async function fetchOwners(id: number, pageNumber?: number) {
    // Verifica ID
    if (!(await validId(id))) {
        return [];
    }

    // API
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: 'owners',
            p: API_KEY,
            tokenId: id.toString(),
            n: pageNumber !== undefined ? pageNumber.toString() : '0'
        }
    }); 

    // Chequea respuesta
    if (response === false) {
        return [];
    }

    let owners: Owner[] = [];
    // Loop
    for (var owner of (response.data as any)) {
        // Ponga el owner
        owners.push(parseOwner(owner));
    }

    return owners;
}

/**
 * Busca el owner de un cock.
 * 
 * @param id
 * number, el id del cock.
 * 
 * @returns `Promise<string | false>`
 */
export async function fetchOwner(id: number) {
    // Verifica ID
    if (!(await validId(id))) {
        return false;
    }
    // Busca dueno por server
    const response = await valid_http(`${MCK_BASE}${API_COCK_GATEWAY}`, {
        params: {
            q: 'owner',
            p: API_KEY,
            tokenId: id.toString()
        }
    });

    // Chequea respuesta
    if (response == false) {
        return false;
    }

    // Parse
    return parseOwner(response.data);
}

/**
 * Convertemos un response a un objecto de owner.
 * 
 * @param ownerData 
 */
export const parseOwner = (ownerData) => {
    return new Owner(
        ownerData.ownerAddress,
        ownerData.previousOwner,
        ownerData.tokenId,
        ownerData.date,
        ownerData.isCurrentOwner == 1,
        ownerData.image, 
        ownerData.name,
    );
}