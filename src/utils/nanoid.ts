import { customAlphabet } from "nanoid";

const base62Alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const idLength = 12;
export const generateId = customAlphabet(base62Alphabet, idLength);
