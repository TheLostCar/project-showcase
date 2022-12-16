import usePointerPosition from "@components/SkewDivNearMouse/usePointerPosition";
import { limitNumberMinMax } from "@lib/limitNumberMinMax";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

type Props = {
    disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>

const GlowingBorderFollowsMouse = (_props: Props) => {
    const { disabled = false, children, ...props } = _props;
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const divRef = useRef<HTMLDivElement | null>(null)
    const mouse = usePointerPosition();


    useEffect(() => {
        if (divRef.current === null) return;
        if (disabled) return;
        const rect = divRef.current.getBoundingClientRect()
        const rectCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        }

        setPos({
            x: limitNumberMinMax(100 * (mouse.x - rect.left) / rect.width, 0, 100),
            y: limitNumberMinMax(100 * (mouse.y - rect.top) / rect.height, 0, 100),
        })
    }, [disabled, mouse.x, mouse.y])

    return (
        <div
            ref={divRef}
            style={{
                padding: '1px',
                background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, 
                    hsl(100deg 100% 75%) 0%,
                    hsl(101deg 63% 62%) 31%,
                    hsl(102deg 44% 50%) 45%,
                    hsl(104deg 54% 38%) 56%,
                    hsl(106deg 76% 26%) 64%,
                    hsl(108deg 91% 19%) 72%,
                    hsl(107deg 74% 15%) 79%,
                    hsl(104deg 63% 11%) 86%,
                    hsl(93deg 61% 7%) 93%,
                    hsl(0deg 0% 0%) 100%                  
                    `

                //                     `hsl(100deg 100% 75%) 0%,
                //   hsl(101deg 63% 62%) 4%,
                //   hsl(102deg 44% 50%) 9%,
                //   hsl(104deg 54% 38%) 17%,
                //   hsl(106deg 76% 26%) 26%,
                //   hsl(108deg 91% 19%) 39%,
                //   hsl(107deg 74% 15%) 54%,
                //   hsl(104deg 63% 11%) 70%,
                //   hsl(93deg 61% 7%) 87%,
                //   hsl(0deg 0% 0%) 100%`

            }}
            {...props}
        >
            {/* <div className="opacity-0s"> */}
            {children}
            {/* </div> */}
        </div>
    );
}

export default GlowingBorderFollowsMouse;