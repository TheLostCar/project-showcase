import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { FaGithub } from 'react-icons/fa';


type Props = {
    children: ReactNode;
    liveHref: string;
    gitHubHref: string;
}

const CustomAnchor = ({ children, liveHref, gitHubHref }: Props) => {
    // const { children, ...props } = _props
    return (
        <div className='flex mt-auto justify-evenly'>
            <a
                href={liveHref}
                className='hover:text-amber-500'
                onClick={e => e.stopPropagation()}
                target='_blank'
                rel='noreferrer'
            >
                {children}
            </a>

            <a
                href={gitHubHref}
                className="[&>svg:hover]:fill-amber-500"
                target='_blank'
                rel='noreferrer'
            >
                <FaGithub size={25} />
            </a>
        </div >
    );
}

export default CustomAnchor;