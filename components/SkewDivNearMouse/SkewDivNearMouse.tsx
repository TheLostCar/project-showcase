import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import usePointerPosition from "./usePointerPosition";
type Vector2D = {
    x: number,
    y: number
}

// used to get value between -.5 and .5 to determine the final angle
// distance factor is a value between -1 and 1. 0 and |1| result in an angle of 0
const getProgression = (zeroCondition: boolean, insideCondition: boolean, distanceFactor: number) => {
    if (zeroCondition) return 0;
    if (insideCondition) return distanceFactor;
    return Math.sign(distanceFactor) - distanceFactor
}

type Props = {
    disabled?: boolean
} & HTMLAttributes<HTMLDivElement>

const SkewDivNearMouse = (_props: Props) => {
    const { disabled = false, ...props } = _props
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [rotation, setRotation] = useState<Vector2D>({ x: 0, y: 0 })
    const mouse = usePointerPosition();

    useEffect(() => {
        if (containerRef.current === null) return;
        const rect = containerRef.current.getBoundingClientRect();

        const rectCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        }

        const result = {
            x: getProgression(
                Math.abs(rectCenter.y - mouse.y) > rect.height * 2 || disabled,
                mouse.y < rectCenter.y + rect.height && mouse.y > rectCenter.y - rect.height,
                (mouse.y - rectCenter.y) / (rect.height * 2)

            ) * 50 * (Math.max(1 - (Math.abs(mouse.x - rectCenter.x) / (rect.width * 2)), 0)), //multipler for distance from center
            y: getProgression(
                Math.abs(rectCenter.x - mouse.x) > rect.width * 2 || disabled,
                mouse.x < rectCenter.x + rect.width && mouse.x > rectCenter.x - rect.width,
                (mouse.x - rectCenter.x) / (rect.width * 2)

            ) * 50 * (Math.max(1 - (Math.abs(mouse.y - rectCenter.y) / (rect.height * 2)), 0)),
        }

        setRotation(result);

    }, [mouse.x, mouse.y, disabled])



    return (
        <div ref={containerRef} {...props}>
            <div
                className={`${disabled && 'transition-all duration-75' || 'transition-none'} overflow-hidden`}
                style={{
                    transform: `perspective(1000px) rotateX(${- rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
            >
                {props.children}
            </div>
        </div>
    );
}

export default SkewDivNearMouse;