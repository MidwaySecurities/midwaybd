import { Zap, TrendingUp, ShieldCheck, Wifi, Clock, Monitor, Globe } from "lucide-react";
import Link from "next/link";
const CHART_POINTS = "0,30 14,20 28,26 42,10 56,16 70,2 84,10 98,4 112,14 126,0";

const TICKERS = [
    { symbol: "dsex", change: "+0.42%", positive: true },
    { symbol: "batbc", change: "-0.18%", positive: false },
    { symbol: "ebl", change: "+0.43%", positive: true },
];

const FEATURES = [
    { icon: Zap, label: "Lightning-fast execution" },
    { icon: TrendingUp, label: "Advanced charting" },
    { icon: ShieldCheck, label: "Stop-loss / Take-profit" },
    { icon: Wifi, label: "Offline market orders" },
    { icon: Clock, label: "24/7 account access" },
    { icon: Monitor, label: "Mobile, Desktop & Web" },
];

function AppleIcon(props) {
    return (
        <svg viewBox="0 0 24 24" className={props.className} fill="currentColor">
            <path d="M16.365 1.43c0 1.14-.42 2.06-1.26 2.86-.9.87-1.98 1.35-3.03 1.28-.13-1.1.42-2.24 1.24-3 .87-.8 2.05-1.36 3.05-1.14zM20.4 17.2c-.5 1.15-.75 1.66-1.4 2.68-.9 1.4-2.18 3.15-3.75 3.16-1.4.02-1.76-.9-3.66-.89-1.9.01-2.3.9-3.7.88-1.57-.02-2.78-1.6-3.68-3-2.5-3.9-2.77-8.48-1.22-10.9 1.1-1.7 2.84-2.7 4.47-2.7 1.66 0 2.7.9 4.08.9 1.34 0 2.15-.9 4.08-.9 1.44 0 2.97.8 4.06 2.16-3.57 1.95-2.99 6.98.72 8.6z" />
        </svg>
    );
}

function PlayIcon(props) {
    return (
        <svg viewBox="0 0 24 24" className={props.className} fill="currentColor">
            <path d="M5 3.4c0-.7.8-1.2 1.4-.8l13.4 8.2c.6.4.6 1.2 0 1.6L6.4 20.6c-.6.4-1.4-.1-1.4-.8V3.4z" />
        </svg>
    );
}

function PhoneMock() {
    return (
        <div className="relative mx-auto w-40 shrink-0 xs:w-44 sm:mx-0 sm:w-52 md:w-60 lg:w-64">
            <img
                src="/images/qtp/portfolio.gif"
                alt="QuickTrade Pro app preview"
                className="h-auto w-full rounded-3xl"
            />
        </div>
    );
}

function Feature({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-2 lg:gap-1.5">
            <Icon className="h-3.5 w-3.5 shrink-0 text-sky-400" strokeWidth={2} />
            <span className="text-[16px] text-black sm:text-sm md:text-base">{label}</span>
        </div>
    );
}

function ActionButton({ icon, eyebrow, label }) {
    return (
        <button
            type="button"
            className="cursor-pointer flex items-center gap-2 rounded-lg border border-white/15 bg-black px-3 py-2 text-left transition-colors sm:gap-2.5 sm:px-3.5"
        >
            {icon}
            <span className="flex flex-col leading-tight">
                <span className="text-[8px] text-white sm:text-[9px]">{eyebrow}</span>
                <span className="text-[10px] font-semibold text-white sm:text-[11px] md:text-xs">
                    {label}
                </span>
            </span>
        </button>
    );
}

export default function TradingPlatforms() {
    return (
        <div className="bg-white px-4 py-6 sm:px-6 sm:py-8">
            <div className="container mx-auto max-w-5xl rounded-[28px] border border-white/10 p-5 xs:p-6 sm:p-8 md:p-10">
                <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-center md:gap-16">
                    <div className="hidden lg:block">
                        <PhoneMock />
                    </div>

                    <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
                        <div className="mb-2">
                            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-medium text-primary_color sm:text-sm">
                                QuickTrade Pro
                            </div>
                        </div>
                        <h2 className="mt-1.5 mb-2 text-3xl font-bold text-black lg:text-5xl">
                            One platform,{" "}
                            <span className="bg-linear-to-r from-secondary_color to-primary_color bg-clip-text text-transparent">
                                every device
                            </span>
                        </h2>
                        <div className="block lg:hidden">
                            <PhoneMock />
                        </div>
                        <div className="mt-4 mb-2 grid grid-cols-1 gap-x-8 gap-y-3 xs:grid-cols-2 sm:grid-cols-2">
                            {FEATURES.map((feature) => (
                                <Feature key={feature.label} icon={feature.icon} label={feature.label} />
                            ))}
                        </div>

                        <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                            <Link href="https://apps.apple.com/us/app/quicktrade-pro/id6740322022" target="_blank">
                                <ActionButton
                                    icon={<AppleIcon className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" />}
                                    eyebrow="Download on the"
                                    label="App store"
                                />
                            </Link>
                            <Link href="https://play.google.com/store/apps/details?id=com.midwaybd.quick_trade_pro&hl=en" target="_blank">
                                <ActionButton
                                    icon={<PlayIcon className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" />}
                                    eyebrow="Get it on"
                                    label="Google play"
                                />
                            </Link>
                            <Link href={"https://oms.midwaybd.com"}>
                                <ActionButton
                                    icon={<Globe className="h-6 w-6 shrink-0 text-white" />}
                                    eyebrow="Trade on"
                                    label="Web platform"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}