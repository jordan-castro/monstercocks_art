import axios, { AxiosResponse } from "axios";

/**
 * Valida un response.
 * 
 * @param response
 * AxiosResponse, el response del request.
 * 
 * @returns `boolean` 
 */
const validHttpResponse = (response: AxiosResponse) => {
    // Chequea status
    if (response.status !== 200) {
        return false;
    }

    if (response.data) {
        return true;
    } else {
        return false;
    }
}

/**
 * Function para hacer un request y regresa la respuesta. 
 * Tambien valida la respuesta para que no tenemor errores.
 * 
 * @param url
 * string, El url para hacer el request.
 * 
 * @param kwargs
 * JSON?, data para el request
 * 
 * @returns Promise<Response | false>
 */
export default async function valid_http(
    url: string,
    kwargs: {
        method?: string,
        headers?: {},
        params?: {},
    } = {
            method: 'GET',
            headers: {},
            params: {}
        }
): Promise<AxiosResponse | false> {
    let response: AxiosResponse;
    
    // Chequea por undefined!
    if (kwargs.headers === undefined) {
        kwargs.headers = {};
    }
    if (kwargs.method === undefined) {
        kwargs.method = 'GET';
    }
    if (kwargs.params === undefined) {
        kwargs.params = {};
    }

    // Chequea method
    if (kwargs.method === 'GET') {
        // hacemos la respuesta
        response = await axios.get(url, {
            params: kwargs.params,
            headers: kwargs.headers,
        });
    } else if (kwargs.method === 'POST') {
        response = await axios.post(url, { ...kwargs.params }, {
            headers: kwargs.headers
        });
    } else {
        return false;
    }

    // Valida el response. Si es valido regresa lo!
    return validHttpResponse(response) && response;
}