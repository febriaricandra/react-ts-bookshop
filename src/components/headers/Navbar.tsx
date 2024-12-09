import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { SquareUser } from "lucide-react";
import { useCart } from "../../context/CartContext";

function Navbar() {
    const { logout } = useAuth();
    const { cart } = useCart();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const onToggleAccount = () => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
    return (
        <nav className="bg-gray-900 antialiased mb-2">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-8">
                        <div className="">
                            <Link to="/" className="">
                                <img className="w-auto h-8 block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg" alt="" />
                            </Link>
                        </div>

                        {/* <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                            <li>
                                <a href="#" title="" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 text-white hover:text-primary-500">
                                    Home
                                </a>
                            </li>
                            <li className="shrink-0">
                                <a href="#" title="" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 text-white hover:text-primary-500">
                                    Best Sellers
                                </a>
                            </li>
                            <li className="shrink-0">
                                <a href="#" title="" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 text-white hover:text-primary-500">
                                    Gift Ideas
                                </a>
                            </li>
                            <li className="shrink-0">
                                <a href="#" title="" className="text-sm font-medium text-gray-900 hover:text-primary-700 text-white hover:text-primary-500">
                                    Today's Deals
                                </a>
                            </li>
                            <li className="shrink-0">
                                <a href="#" title="" className="text-sm font-medium text-gray-900 hover:text-primary-700 text-white hover:text-primary-500">
                                    Sell
                                </a>
                            </li>
                        </ul> */}
                    </div>

                    <div className="flex flex-row gap-2 relative">
                        <div className="flex items-center lg:space-x-2">
                            <Link to="/carts" id="myCartDropdownButton1" data-dropdown-toggle="myCartDropdown1" type="button" className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 text-white">
                                <div className="relative">
                                    <span className="sr-only">
                                        Cart
                                    </span>
                                    <svg className="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                                    </svg>
                                    <span className="sr-only">Notifications</span>
                                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 border-gray-900">{cart.length}</div>
                                </div>
                                <span className="hidden sm:flex">My Cart</span>
                            </Link>
                        </div>

                        {
                            user ? (
                                <>
                                    <button type="button"
                                        onClick={onToggleAccount}
                                        className="flex text-sm bg-gray-800 rountaided-full md:me-0 focus:ring-4 focus:ring-gray-300 focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                    </button>

                                    <div className="z-50 absolute top-10 hidden text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600" id="user-dropdown">
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-white uppercase">
                                                {user.name}
                                            </span>
                                            <span className="block text-sm truncate text-gray-400">
                                                {user.email}
                                            </span>
                                        </div>
                                        <ul className="py-2" aria-labelledby="user-menu-button">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Dashboard</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Settings</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Earnings</a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={logout}
                                                    href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-2 hover:bg-gray-100 hover:bg-gray-700 p-2 rounded-lg">
                                    <Link to="/login" className="flex flex-row gap-1 text-sm font-medium text-gray-900 text-white hover:text-primary-700 hover:text-primary-500">
                                        <SquareUser size={20} className="text-gray-900 text-white" />
                                        <span className="hidden sm:flex">Login</span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar