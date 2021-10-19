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