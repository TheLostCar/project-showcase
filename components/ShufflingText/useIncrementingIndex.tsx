import { useCallback, useState } from "react";


type useIncrementingIndexType = (maxIndex: number, start?: number) => [number, (amt?: number) => void]


const useIncrementingIndex: useIncrementingIndexType = (length, start = 0) => {
    const [index, _setIndex] = useState(start);

    const incIndex = useCallback((amt = 1) => {
        let sum = index + (Math.abs(amt) % length) * Math.sign(amt)
        if (sum > length - 1) return _setIndex(sum - length)
        if (sum < 0) return _setIndex(sum)
        return _setIndex(sum)

    }, [length, index])

    return [index, incIndex];
}
//                    
[0, 1, 2, 3]

export default useIncrementingIndex;