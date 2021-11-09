import { MCK_BASE } from "../utils/globals";
import { API_MAIL_GATEWAY } from "../utils/server_keys";
import valid_http from "../utils/valid_http";

/**
 * Manda un correo al server para ponerlo en un archivo de json.
 * 
 * @param {string} mail El correo a enviar.
 * 
 * @returns {Promise<boolean>} Una promesa que se resuelve con un booleano. 
 */
export default async function send_mail(mail: string): Promise<boolean> {
    const result = await valid_http(`${MCK_BASE}${API_MAIL_GATEWAY}`);

    return result != false ? result.data == 1 : false;
}