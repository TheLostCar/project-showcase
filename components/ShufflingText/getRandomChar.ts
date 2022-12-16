import { getRandomIntInclusive } from "@lib/random";

const CHARACTER_POOL = ')(*&^%$#@!~`/><}{[]\\abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const getRandomChar = () => {
    return CHARACTER_POOL.charAt(getRandomIntInclusive(0, CHARACTER_POOL.length - 1))
}

export default getRandomChar;