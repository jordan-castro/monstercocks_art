import AuthorData from "../models/author";
import { MCK_BASE } from "../utils/globals";
import { API_AUTHOR_GATEWAY, API_KEY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";

/**
 * @description Fetches author data from the server
 * 
 * @param address
 * string - The address of the author
 *  
 * @returns `Promise<Author|false>` 
 */
export async function fetchAuthor(address: string): Promise<AuthorData | false> {
    // Buscamos el author por el address
    const response = await valid_http(`${MCK_BASE}${API_AUTHOR_GATEWAY}`, {
        params: {
            q: 'view',
            p: API_KEY,
            address: address,
            t: new Date().getTime(),
        }
    });

    // Chequea la resulta de response
    if (response === false) {
        return false;
    }

    // Esta bien parse el author
    return parseAuthor(response.data);
}

/**
 * Creamos un nuevo author.
 *
 * @param formData
 * La información del author.
 * 
 * @returns `Promise<boolean>` 
 */
export async function createAuthor(formData): Promise<boolean> {
    console.log(formData);

    // Crea el author
    const response = await valid_http(`${MCK_BASE}${API_AUTHOR_GATEWAY}?q=upload&p=${API_KEY}`, {
        params: formData,
        method: 'FORM',
        headers: {
            'Content-Type': 'multipart/form-data;',
        }
    });

    // Regresa la resulta de response
    return response && response.data === 1;
}


const parseAuthor = (authorData: any): AuthorData => {
    return new AuthorData(
        authorData.id,
        authorData.address,
        authorData.name,
        authorData.image,
        authorData.about,
        authorData.facebook,
        authorData.instagram,
        authorData.twitter,
        authorData.github,
    );
}