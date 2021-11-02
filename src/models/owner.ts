import { addBaseToImage } from "../utils/add_base_to_image";
import toDateTime from "../utils/to_date_time";

export default class Owner {
    address: string;
    previous: string;
    tokenId: number;
    date: Date;
    isCurrentOwner: boolean;
    image?: string;
    name?: string;

    constructor(address: string, previous: string, tokenId: number, date: string, isCurrentOwner: boolean, image?: string, name?: string) {
        this.address = address;
        this.previous = previous;
        this.tokenId = tokenId;
        this.date = toDateTime(+date);
        this.isCurrentOwner = isCurrentOwner;
        this.image = addBaseToImage(image);
        this.name = name;
    }
}