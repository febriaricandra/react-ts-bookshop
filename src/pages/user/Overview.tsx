import RevenueCard from "../../components/cards/RevenueCard"

function Overview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {/* Growth Rate Box */}
            <div className="bg-[#FF5722] rounded-3xl p-8 col-span-1 md:col-span-1">
                <div className="flex flex-col h-full">
                    <span className="text-white text-6xl font-bold mb-4">350%</span>
                    <p className="text-white text-xl">Average annual growth rate among our clients.</p>
                </div>
            </div>

            {/* Business Stats Box */}
            <div className="bg-emerald-500 rounded-3xl p-8 row-span-2 col-span-1">
                <h3 className="text-white text-2xl font-bold mb-8">Join the 14k + business using Rebond</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="border border-white/20 rounded-xl p-6">
                        <div className="w-8 h-8 bg-white/20 rounded-full mb-4" />
                        <p className="text-white text-xl">Monthly stats sent straight to your inbox!</p>
                    </div>
                    <div className="border border-white/20 rounded-xl p-6">
                        <div className="w-8 h-8 bg-white/20 rounded-full mb-4" />
                        <p className="text-white text-xl">Manage & optimise business SEO</p>
                    </div>
                </div>
            </div>

            {/* ROAS Box */}
            <div className="bg-white rounded-3xl p-8">
                <div className="flex flex-col items-center text-center">
                    <span className="text-6xl font-bold mb-2 text-black">95%</span>
                    <p className="text-gray-800">ROAS has increased to prior funding</p>
                </div>
            </div>

            {/* Google Search Box */}
            <div className="bg-pink-400 rounded-3xl p-8">
                <div className="flex flex-col items-center text-center">
                    <span className="text-6xl font-bold text-white mb-2">+90k</span>
                    <p className="text-white">We can't believe we are on first Google search now!</p>
                </div>
            </div>

            {/* Revenue Chart Box */}
            {/* <div className="bg-[#6366F1] rounded-3xl p-8 col-span-1 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-white">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-lg">Revenue last quarter</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                </div>
                <div className="text-white text-6xl font-bold mb-6">+573%</div>
                <div className="flex justify-between items-end mt-8">
                    <div className="flex gap-4">
                        {[40, 60, 45, 55, 50, 70, 75, 100].map((height, index) => (
                            <div key={index} className="w-6 bg-indigo-400 rounded-full overflow-hidden">
                                <div
                                    className="w-full bg-white rounded-full"
                                    style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <span className="text-white">$3.4m</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm mt-2">
                    <span>3.25</span>
                    <span>10.23</span>
                </div>
            </div> */}
            <RevenueCard />

            {/* Customer Loyalty Box */}
            <div className="bg-white rounded-3xl p-8">
                <div className="flex flex-col h-full justify-between">
                    <p className="text-xl font-medium mb-6 text-black">
                        Enhance customer loyalty with instant refunds and reduce your returns with instant exchanges and store credit.
                    </p>
                    <button className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit">
                        Request a Demo
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}



export default Overview