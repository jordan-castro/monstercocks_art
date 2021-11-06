/**
 * Class to handle routing within the Application.
 */
class RouteHandler {
    /**
     * Function para mandar el current href al path.
     * @param path
     * El path que se va a mandar al href.
     */
    static goTo(path) {
        window.location.href = path;
    }

    /**
     * Regresa el url para un owner.
     * 
     * @param address
     * El addresso del owner.
     * 
     * @returns {string}
     */
    static getOwnerUrl(address: string) {
        return `${Routes.OWNER}${address}`;
    }

    /**
     * Regresa el url para un cock.
     * 
     * @param cockId
     * numero del cock.
     * 
     * @returns {string}
     */
    static getCockUrl(cockId: number) {
        return `${Routes.COCK}${cockId}`;
    }

    /**
     * Vamos al siguiente pagina por su nextPage.
     * 
     * @param href 
     * El href del nextPage.
     * @param nextPage 
     * El nextPage.
     * 
     * @returns {string}
     */
    static goToNextPage(href: string, nextPage: {key: string, value: number}, query?: {key: string, value: string}) {
        let url = `${href}?${nextPage.key}=${nextPage.value}`;
        if (query) {
            url = `${url}&${query.key}=${query.value}`;
        }
        return url;
    }

    /**
     * Solo Query URL.
     * 
     * @param href
     * El href del pagina a ir.
     * @param query
     * El query a mandar.
     * 
     * @returns {string}
     */
    static goToQuery(href: string, query: {key: string, value: string}) {
        return `${href}?${query.key}=${query.value}`;
    }
}

export enum Routes {
    HOME = "/",
    COCK = "/cock/",
    COCKS = "/cocks/",
    EDIT = "/edit",
    OWNER = "/owner/",
    OWNERS = "/owners/",
    ACTIVTY = "/activity/"
}

export default RouteHandler;