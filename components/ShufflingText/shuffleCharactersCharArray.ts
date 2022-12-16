import { getRandomIntInclusive } from "@lib/random";
import getRandomChar from "./getRandomChar";

// modifies the original array
// amount determines how many index positions are selected for change

const shuffleCharacters = (str: string[], amount: number) => {
    const indexToChange = new Array(str.length).fill(0).map((_, i) => i);

    for (let i = 0; i < str.length - amount; i++) {
        indexToChange.splice(getRandomIntInclusive(0, indexToChange.length - 1), 1)
    }

    for (let i = 0; i < indexToChange.length; i++) {
        str[indexToChange[i]] = getRandomChar()
    }
}

export default shuffleCharacters