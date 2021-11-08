import { addBaseToImage } from "./add_base_to_image";
import { DEFAULT_AVATAR } from "./globals";
import { shortenAddress } from "./shorten_string";

export const safeImage = (image?: string): string => {
    return image ? addBaseToImage(image) : DEFAULT_AVATAR;
}

export const safeAuthorName = (address, name?: string): string => {
    return name ? name : shortenAddress(address);
}