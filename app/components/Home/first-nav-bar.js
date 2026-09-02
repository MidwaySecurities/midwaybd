'use client'
import Link from "next/link";
import Logo from "./logo";
import style from './first-nav-bar.module.css'
import { useEffect } from "react";
const FirstNavBar = () => {
    useEffect(() => {
        fetch('https://portal.midwaybd.com/api/check-auth', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }, [])
    return (
        <div className="flex justify-between items-center bg-white p-4 text-white">
            <Link className={`${style.logoZoom} flex items-center gap-2 font-bold text-gray-800 text-[14px]`} href={`/`}>
                <Logo />
                {/* <h1 className="">Midway Securities Ltd.</h1> */}
                {/* <h1 className="flex flex-col leading-0 justify-center uppercase mt-[-.25rem]"><span className="text-xl tracking-[2px]">Midway</span><span className="tracking-[.93px] text-[.6rem] leading-2">Securities Ltd.</span></h1> */}
            </Link>
            <h1 className="flex flex-col leading-0 justify-center uppercase mt-[-.25rem] text-primary_color font-bold"><span className="text-xl tracking-[2px]">Midway</span><span className="tracking-[1.88px] text-[.6rem] leading-2">Securities Ltd.</span></h1>

            <p className="bg-secondary_color p-2 px-3 rounded-md"><Link href={`https://portal.midwaybd.com`}>Login</Link></p>
        </div>
    )
}
export default FirstNavBar;