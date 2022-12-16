import { ReactNode } from 'react';
import Navbar from '../Navbar';

type Props = {
    text: string;
    href: string;
    children: ReactNode;
}

const Layout = ({ children, text, href }: Props) => {
    return (
        <>
            <Navbar text={text} href={href} />
            {children}
        </>
    );
}

export default Layout;