import Link from "next/link";

type Props = {
    text: string;
    href: string;
}

const Navbar = ({ text, href }: Props) => {
    return (
        <nav className="p-6 flex justify-end">
            <Link
                className="font-thin text-xl text-white text-opacity-90 hover:text-orange-300 transition-colors"
                href={href}
            >
                {text}
            </Link>
        </nav>
    );
}

export default Navbar;