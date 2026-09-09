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
        <div className="lg:container lg:m-auto flex justify-between items-center bg-white p-4 text-white">
            <Link className={`${style.logoZoom} flex items-center gap-2 font-bold text-gray-800 text-[14px]`} href={`/`}>
                <Logo width = {55} height = {55} />
                {/* <h1 className="">Midway Securities Ltd.</h1> */}
                {/* <h1 className="flex flex-col leading-0 justify-center uppercase mt-[-.25rem]"><span className="text-xl tracking-[2px]">Midway</span><span className="tracking-[.93px] text-[.6rem] leading-2">Securities Ltd.</span></h1> */}
                {/* need a gap after midway */}
            </Link>
<h1 className="flex shrink-0 flex-col lg:flex-row items-center lg:items-baseline leading-0 justify-center uppercase -mt-1 text-primary_color font-bold">
  <span className="text-3xl lg:text-4xl tracking-[2px]">Midway</span>
  <span className="hidden lg:inline">{"\u00a0\u00a0\u00a0"}</span>
  <span className="text-[.6rem] lg:text-3xl xl:text-4xl tracking-[4.8px] lg:tracking-[2px] leading-2 lg:leading-none">
    Securities Ltd.
  </span>
</h1>
            <p className="bg-secondary_color p-2 px-3 rounded-md"><Link href={`https://portal.midwaybd.com`}>Login</Link></p>
        </div>
    )
}
export default FirstNavBar;