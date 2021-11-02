import { addBaseToImage } from "../utils/add_base_to_image";
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
    github?: string;

    constructor(
        id: number, 
        address: string, 
        name: string, 
        image: string, 
        about: string, 
        facebook?: string, 
        instagram?: string, 
        twitter?: string,
        github?: string
    ) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.image = addBaseToImage(image);
        this.about = about;
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
        this.github = github;
    }
}