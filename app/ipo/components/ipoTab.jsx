'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const IpoTab = () => {
    const [activeTab, setActiveTab] = useState('upcoming')
    const [ipos, setIpos] = useState([])
    useEffect(async () => {
        const ipos = await fetch('http://midway-app.test/api/ipos')
        const res = await ipos.json()
        setIpos(res.data.data)
    }, [fetch])
    console.log(ipos)
    // const upcomingIPOs = [
    //     {
    //         company: 'Techno Drugs Limited',
    //         sector: 'Pharmaceuticals',
    //         priceRange: '৳45 - ৳52',
    //         lotSize: '500 shares',
    //         openDate: '2025-11-15',
    //         closeDate: '2025-11-25',
    //         status: 'Opening Soon',
    //         logo: '💊'
    //     }
    // ]

    const recentIPOs = [
        {
            company: 'Bengal Steel Mills',
            sector: 'Manufacturing',
            listingGain: '+28%',
            status: 'Listed',
            logo: '🏭'
        },
        {
            company: 'Green Energy Ltd',
            sector: 'Power & Energy',
            listingGain: '+15%',
            status: 'Listed',
            logo: '⚡'
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 font-semibold transition-all ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Upcoming IPOs
                </button>
                <button
                    onClick={() => setActiveTab('recent')}
                    className={`px-6 py-3 font-semibold transition-all ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Recent Listings
                </button>
            </div>

            {/* Upcoming IPOs */}
            {activeTab === 'upcoming' && (
                <div className="space-y-4">
                    {ipos.map((ipo, index) => (
                        <div key={index} className="group p-8 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-4xl border border-slate-200">
                                        <img src={`https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/273673271_436831418186580_6650205940811930798_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=DkmlwSRdArYQ7kNvwF7p3Bs&_nc_oc=AdqpDMz3EoAo5VXfyMoZrz3r7hdVJXziOxcxpTkM4j4SoSwd3S4okItAEr29CMjjLOo&_nc_zt=23&_nc_ht=scontent.fzyl2-2.fna&_nc_gid=CEQ1ynNlUeM6Gz_OFzpcKw&_nc_ss=7b2a8&oh=00_Af5K0qeUWple4b0_ZLN_XAQ8RIFvjOE3U0isMAGf2RpD9w&oe=6A1889E9`} alt={ipo.ipo_name} width={64} height={64} className="rounded-2xl object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">{ipo.ipo_name}</h3>
                                        <p className="text-slate-600">{`Pharmaceuticals`}</p>
                                        <div className="inline-flex mt-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-semibold">
                                            {`Openning Soon`}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6">
                                    <div>
                                        <p className="text-slate-500 text-sm mb-1">Price Range</p>
                                        <p className="text-slate-800 font-bold text-lg">৳{ipo.price_per_share}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm mb-1">Lot Size</p>
                                        <p className="text-slate-800 font-bold text-lg">{ipo.lotSize}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm mb-1">Application Period</p>
                                        <p className="text-slate-800 font-bold text-sm">{ipo.sub_start} - {ipo.sub_end}</p>
                                    </div>
                                </div>

                                <Link href={`/ipo/application`}>
                                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                                        Apply Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Recent Listings */}
            {activeTab === 'recent' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentIPOs.map((ipo, index) => (
                        <div key={index} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-2xl border border-slate-200">
                                        {ipo.logo}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800">{ipo.company}</h4>
                                        <p className="text-sm text-slate-600">{ipo.sector}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-emerald-600">{ipo.listingGain}</p>
                                    <p className="text-xs text-slate-500">Listing Gain</p>
                                </div>
                            </div>
                            <div className="inline-flex px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold">
                                {ipo.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default IpoTab