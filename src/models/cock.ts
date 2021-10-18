import Attribute from "./attribute";

export default class MonsterCock {
    id: number;
    name: string;
    uri: string;
    image: string;
    attributes: Attribute[];

    constructor(id: number, name: string, uri: string, image: string, attributes: Attribute[]) {
        this.id = id;
        this.name = name;
        this.uri = uri;
        this.image = image;
        this.attributes = attributes;
    }
}