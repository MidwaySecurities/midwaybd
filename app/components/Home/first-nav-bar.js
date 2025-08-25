import Link from "next/link";
import Logo from "./logo";
import style from './first-nav-bar.module.css'
const FirstNavBar = () => {
    return (
        <div className="flex justify-between items-center bg-[#9999a1] p-4 text-white">
            <Link className={`${style.logoZoom} flex items-center gap-2 font-bold text-gray-800 text-[14px]`} href={`/`}>
                <Logo />
                {/* <h1 className="">Midway Securities Ltd.</h1> */}
                {/* <h1 className="flex flex-col leading-5 justify-center uppercase"><span className="tracking-[12.4px]">Midway</span><span className="tracking-[.9px]">Securities Ltd.</span></h1> */}
                <h1 className="flex flex-col leading-0 justify-center uppercase"><span className="text-xl tracking-[2px]">Midway</span><span className="tracking-[.93px] text-[.6rem] leading-2">Securities Ltd.</span></h1>
            </Link>
            <p className="bg-[#1E293B] p-2 px-3 rounded-md"><Link href={`https://portal.midwaybd.com/bo/portal-login`}>Login</Link></p>
        </div>
    )
}
export default FirstNavBar;