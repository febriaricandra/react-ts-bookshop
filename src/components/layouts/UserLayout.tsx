import { Outlet } from 'react-router-dom';
import { Heart, Star, RefreshCcw, Settings, LogOut, Package, Home, Eye, ChevronDown } from 'lucide-react'


function UserLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col lg:flex-row">
            {/* Main Layout */}
            {/* Sidebar */}
            <div className="w-full lg:w-80 p-4 border-b lg:border-r lg:border-b-0 border-slate-800">
                {/* Profile Header */}
                <div className="flex items-center justify-between mb-6 p-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <span className="text-lg font-semibold">JL</span>
                        </div>
                        <div>
                            <h2 className="font-semibold">Jese Leos (Personal)</h2>
                            <p className="text-sm text-slate-400">jese@flowbite.com</p>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-300">
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <button className="flex flex-col items-center justify-center py-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                        <Settings className="h-5 w-5 mb-2" />
                        <span className="text-xs">Profile</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-4 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                        <Package className="h-5 w-5 mb-2" />
                        <span className="text-xs">Gifts</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-4 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors">
                        <RefreshCcw className="h-5 w-5 mb-2" />
                        <span className="text-xs">Wallet</span>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {[
                        { icon: Package, label: 'My orders' },
                        { icon: Star, label: 'Reviews' },
                        { icon: Home, label: 'Delivery addresses' },
                        { icon: Eye, label: 'Recently viewed' },
                        { icon: Heart, label: 'Favourite items' },
                        { icon: Settings, label: 'Settings' },
                    ].map((item, index) => (
                        <button key={index} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-slate-800 transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span>Log out</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}


export default UserLayout