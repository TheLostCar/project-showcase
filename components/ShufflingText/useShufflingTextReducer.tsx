import { Dispatch, useCallback, useReducer } from "react";

type State =
    | { state: 'expanding', size: number }
    | { state: 'shrinking' }
    | { state: 'revealing', revealedIndex: number }
    | { state: 'done', ticks: number }

type Action =
    | { type: 'expand', size: number }
    | { type: 'shrink' }

    | { type: 'reveal' }
    | { type: 'INC_REVEALED_INDEX', amount: number }

    | { type: 'done' }
    | { type: 'INC_TICK' };

const useShufflingTextReducer = (): [State, Dispatch<Action>] => {
    const reducer = useCallback((state: State, action: Action): State => {
        switch (action.type) {
            case 'shrink':
                return { state: 'shrinking' }

            case 'expand':
                return { state: 'expanding', size: action.size }

            case 'reveal':
                return { state: 'revealing', revealedIndex: 0 }

            case 'done':
                return { state: 'done', ticks: 0 }

            case 'INC_REVEALED_INDEX':
                if (state.state !== 'revealing') return state;
                return { ...state, revealedIndex: state.revealedIndex + action.amount }

            case 'INC_TICK':
                if (state.state !== 'done') return state;
                return { ...state, ticks: state.ticks + 1 }
        }
    }, [])

    const [state, dispatch] = useReducer(reducer, { state: 'shrinking' })

    return [state, dispatch];
}

export default useShufflingTextReducer;