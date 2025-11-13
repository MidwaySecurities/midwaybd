import { TrendingUp, Shield, Zap, Clock, ArrowRight, Bell, Users, Wallet } from 'lucide-react'
import IpoTab from './components/ipoTab'
import NagadLogo from './logoComponents/Nagad'
import RocketLogo from './logoComponents/Rocket'




export default function IPOApplicationPage() {
    const paymentMethods = [
        { name: 'bKash', icon: <svg xmlns="http://www.w3.org/2000/svg" height="800" width="1200" viewBox="-6.6741 -11.07275 57.8422 66.4365"><g fill="none"><path fill="#DF146E" d="M42.31 44.291H2.182C.981 44.291 0 43.308 0 42.107V2.186C0 .982.981 0 2.182 0H42.31c1.203 0 2.184.982 2.184 2.186v39.921c0 1.201-.981 2.184-2.184 2.184"/><path fill="#FFF" d="M31.894 24.251l-14.107-2.246 1.909 8.329zm.572-.682L21.374 8.16l-3.623 13.106zm-15.402-2.482L5.441 6.239l15.221 1.819zm-5.639-6.154l-6.449-6.08h1.695zm24.504 1.15L33.2 23.486l-4.426-6.118zM21.417 30.232l10.71-4.3.454-1.365zm-8.933 7.821l4.589-16.102 2.326 10.479zm24.099-21.914l-1.128 3.056 4.059-.07z"/></g></svg>, fee: '1%', color: 'from-pink-100 to-rose-100 border-pink-300' },
        { name: 'Nagad', icon: <NagadLogo /> , fee: '1%', color: 'from-orange-100 to-amber-100 border-orange-300' },
        { name: 'Rocket', icon: <RocketLogo />, fee: '1%', color: 'from-purple-100 to-violet-100 border-purple-300' },
        { name: 'Bank Transfer', icon: '🏦', fee: 'Free', color: 'from-blue-100 to-cyan-100 border-blue-300' }
    ]

    const benefits = [
        { icon: <Zap className="w-6 h-6" />, title: 'Instant Application', desc: 'Apply in 2 minutes' },
        { icon: <Shield className="w-6 h-6" />, title: 'Secure Process', desc: '100% safe & encrypted' },
        { icon: <Clock className="w-6 h-6" />, title: '24/7 Access', desc: 'Apply anytime, anywhere' },
        { icon: <Users className="w-6 h-6" />, title: 'Expert Support', desc: 'Dedicated assistance' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-700 text-sm font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            <span>আই.পি.ও অনলাইনে আবেদন করুন</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-800">
                            Apply for <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">IPO Online</span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Bangladesh's fastest and most secure way to invest in Initial Public Offerings
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2">
                                Apply Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white hover:bg-slate-50 border-2 border-slate-300 rounded-xl text-slate-700 font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
                                <Bell className="w-5 h-5" />
                                Join IPO Alerts
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-md">
                                {benefit.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                            <p className="text-slate-600">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* IPO Listings */}
            <IpoTab />

            {/* Payment Methods */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Easy <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">IPO Deposits</span>
                    </h2>
                    <p className="text-slate-600 text-lg">Multiple payment options for your convenience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paymentMethods.map((method, index) => (
                        <div key={index} className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className={`w-16 h-16 p-2 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{method.name}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Service Fee:</span>
                                <span className="text-slate-800 font-semibold">{method.fee}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <Wallet className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-slate-800 font-semibold mb-2">Direct BO Account Deposit</h4>
                            <p className="text-slate-600 text-sm">Deposit directly to your BO account via mobile banking or bank transfer. Funds will be available instantly for IPO applications.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative overflow-hidden p-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

                    <div className="relative text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Join IPO Membership Club
                        </h2>
                        <p className="text-white/95 text-lg max-w-2xl mx-auto">
                            Get exclusive access to IPO alerts, expert analysis, and priority application support
                        </p>
                        <button className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
                            <Users className="w-5 h-5" />
                            Join Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}