import { useEffect, useState } from "react";

const usePointerPosition = () => {
    const [mouse, setMouse] = useState({
        x: 0,
        y: 0,
    })

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            setMouse({
                x: e.clientX,
                y: e.clientY
            })

        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => window.removeEventListener('pointermove', handlePointerMove);
    })
    return mouse
}

export default usePointerPosition;