import Link from "next/link";
import Logo from "./logo";

const FirstNavBar = () => {
    return (
        <div className="flex justify-between items-center bg-[#9999a1] p-4 text-white">
            <Link className="flex items-center gap-2 font-bold text-gray-800 text-lg" href={`/`}>
                <Logo />
                {/* <h1>Midway Securities Ltd.</h1> */}
                <h1 className="flex flex-col leading-5"><span className="tracking-wider">Midway</span><span>Securities Ltd.</span></h1>
            </Link>
            <p className="bg-[#1E293B] p-2 px-3 rounded-md"><Link href={`https://portal.midwaybd.com/bo/portal-login`}>Login</Link></p>
        </div>
    )
}
export default FirstNavBar;