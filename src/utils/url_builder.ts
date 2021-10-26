import { CONTRACT_ADDRESS } from "./globals"

/**
 * Crea un direct link a la pagia de open sea para un asset.
 * 
 * @param id 
 * number?, el id del cock para buscar en opensea.
 * 
 * @returns `string`
 */
export const openseaUrl = (id?: number): string => {
    if (id !== undefined) {
        return `https://opensea.io/assets/matic/${CONTRACT_ADDRESS}/${id}`
    } else {
        return "https://opensea.io/collection/monstercocks"
    }
}

/**
 * Crea un direct link para un address a PolygonScan o transaction.
 *
 * @param polyData
 * JSON, el objeto con la informacion de la transaccion o address.
 * 
 * @returns string
 */ 
export const polygonUrl = (polyData: {tx?: string, address?: string}): string => {
    // Check if the data is a transaction
    if (polyData.tx) {
        return `https://polygonscan.com/tx/${polyData.tx}`
    } else {
        // Entonces es address
        return `https://polygonscan.com/address/${polyData.address}`
    }
}