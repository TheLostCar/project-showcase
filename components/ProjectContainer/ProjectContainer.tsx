import GlowingBorderFollowsMouse from "@components/GlowingBorderFollowsMouse";
import SkewDivNearMouse from "@components/SkewDivNearMouse";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import styles from './ProjectContainer.module.scss'

type Props = {
    src: string;
    alt: string;
    children: ReactNode;
    bgSrc?: string;
}

const ProjectContainer = ({ children, src, alt, bgSrc = '' }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const toggleDisabled = () => setDisabled(d => !d)
    const noHide = true

    return (
        <SkewDivNearMouse className={`inline-block whitespace-normal w-56 rounded-xl overflow-hidden`} disabled={disabled} onClick={toggleDisabled}>
            <GlowingBorderFollowsMouse className={`rounded-xl bg-gray-900 relative ${styles.handleHover}`} >


                <div className={`aspect-square bg-grayf-800 bg-gray-900 rounded-xl p-5 relative overflow-hidden`}>

                    <Image
                        className={`transition-all duration-500 select-none  ${disabled && 'opacity-10' || 'opacity-100'} ${(!disabled && !noHide) && styles.hide || styles.hide}  `}
                        draggable={false}
                        src={src}
                        alt={alt}
                        width={500}
                        height={500}
                    />


                    <video
                        autoPlay
                        loop
                        muted
                        className={`${styles.bg} ${!disabled && styles.show || styles.showLess}`}
                        style={{ backgroundImage: `url('${bgSrc}')` }} src={bgSrc}
                    />
                    {/* <div
                        className={`${styles.bg} ${!disabled && styles.show || ''}`}
                        style={{ backgroundImage: `url('${bgSrc}')` }}
                    /> */}
                </div>
                <div className={`absolute transition-all duration-300 delay-75s w-full h-full  ${disabled && 'top-0 opacity-100' || 'top-full opacity-0'}`}>

                    {children}
                </div>

            </GlowingBorderFollowsMouse>
        </SkewDivNearMouse >
    );
}

export default ProjectContainer;