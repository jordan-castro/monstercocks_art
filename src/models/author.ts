import { MCK_BASE } from "../utils/globals";

export default class AuthorData {
    id: number;
    address: string;
    name: string;
    image: string;
    about: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;

    constructor(
        id: number, 
        address: string, 
        name: string, 
        image: string, 
        about: string, 
        facebook?: string, 
        instagram?: string, 
        twitter?: string
    ) {
        this.id = id;
        this.address = address;
        this.name = name;
        // Pon el base path si hay un imagen
        if (image) {
            this.image = `${MCK_BASE}${image}`;
        } else {
            this.image = image;
        }
        this.about = about;
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
    }

    // Buscamos un author sobre su address que esta en localStorage
    // TODO
    // static findAuthorByAddress(address: string): AuthorData {
        // const authors: AuthorData[] = JSON.parse((window as any).localStorage.getItem('authors'));
        // const author = authors.find(author => author.address === address);
        // return author;
    // }
}