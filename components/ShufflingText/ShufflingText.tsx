import { HTMLAttributes, useEffect, useState } from "react";
import useShufflingTextReducer from "./useShufflingTextReducer";
import useIncrementingIndex from "./useIncrementingIndex";
import getRandomChar from "./getRandomChar";
import shuffleCharacters from "./shuffleCharactersCharArray";

type Props = {
    textArr: string[];

} & HTMLAttributes<HTMLDivElement>

const TICK_SPEED = 20


const ShufflingText = (props: Props) => {
    const { textArr, ...containerProps } = props;
    const [text, setText] = useState<string[]>([]);

    const [index, incIndex] = useIncrementingIndex(textArr.length);
    const [state, dispatch] = useShufflingTextReducer();

    useEffect(() => {
        const animate = () => {
            let result = [...text];

            switch (state.state) {
                case 'shrinking':
                    shuffleCharacters(result, Math.round(result.length / 2));
                    if (result.length === 0) dispatch({ type: 'expand', size: textArr[index].length });
                    if (result.length > 0) result = [...text]; result.pop();
                    break;

                case 'expanding':
                    shuffleCharacters(result, Math.round(result.length / 2));
                    if (result.length === state.size) dispatch({ type: 'reveal' });
                    if (result.length < state.size) result.push(getRandomChar());
                    break;

                case 'revealing':
                    shuffleCharacters(result, Math.round(result.length / 2));
                    if (text.join('') === textArr[index]) dispatch({ type: 'done' })

                    result.splice(0, state.revealedIndex, ...textArr[index].split('').slice(0, state.revealedIndex));
                    dispatch({ type: 'INC_REVEALED_INDEX', amount: TICK_SPEED / (1000 / 20) })
                    break;

                case 'done':
                    if (state.ticks === 20) {
                        incIndex()
                        dispatch({ type: "shrink" });
                        break;
                    };
                    dispatch({ type: "INC_TICK" });
            }
            setText(result)
        }

        let timeout = setTimeout(animate, TICK_SPEED);
        return () => clearTimeout(timeout);
    })

    return (
        <div {...containerProps}>
            {text.join('')}
        </div>
    );
}

export default ShufflingText;