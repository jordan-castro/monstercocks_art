/**
 * Holds the data for an individual attribute.
 * Guarda la data por un attributo indivisual.
 * 
 * Data:
 * - type: string, el nombre del attribute
 * - value: string, el value para el attribute
 */
export default class Attribute {
    type: string;
    value: string;

    constructor(type: string, value: string) {
        this.type = type;
        this.value = value;
    }
}