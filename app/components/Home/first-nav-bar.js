import Link from "next/link";
import Logo from "./logo";

const FirstNavBar = () => {
    return (
        <div className="flex justify-between items-center bg-[#9999a1] p-4 text-white">
            <Link href={`/`}>
                <Logo />
            </Link>
            <p className="bg-[#1E293B] p-2 px-3 rounded-md">Login</p>
        </div>
    )
}
export default FirstNavBar;