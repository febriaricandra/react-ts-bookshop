import { useAuth } from '../../context/AuthContext';
import { useFlashMessage } from '../../context/FlashMessageContext';
import { useNavigate } from 'react-router-dom';
function NavAdmin({ onToggleSidebar }: { onToggleSidebar: () => void }) {

    const { logout } = useAuth();
    const { showMessage }: any = useFlashMessage();
    const navigate = useNavigate();
    const handleLogout = () => {
        showMessage("You have been logged out", "success");
        navigate("/");
        logout();
    }
    const onToggleAccount = () => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
    return (
        <nav className="sticky top-0 z-50 border-gray-200 bg-gray-800">
            <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
                </a>
                <div className="static flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button"
                        onClick={onToggleAccount}
                        className="flex text-sm bg-gray-800 rountaided-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                    </button>

                    <div className="z-50 absolute right-4 top-14 hidden text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-white">Bonnie Green</span>
                            <span className="block text-sm truncate text-gray-400">name@flowbite.com</span>
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
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white w-full text-left">Sign out</button>
                            </li>
                        </ul>
                    </div>
                    <button onClick={onToggleSidebar} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>

    )
}

export default NavAdmin