export default class AuthorData {
    id: number;
    address: string;
    name: string;
    image: string;
    about: string;
    email: string;

    constructor(id: number, address: string, name: string, image: string, about: string, email: string) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.image = image;
        this.about = about;
        this.email = email;
    }

    // Buscamos un author sobre su address que esta en localStorage
    // TODO
    // static findAuthorByAddress(address: string): AuthorData {
        // const authors: AuthorData[] = JSON.parse((window as any).localStorage.getItem('authors'));
        // const author = authors.find(author => author.address === address);
        // return author;
    // }
}