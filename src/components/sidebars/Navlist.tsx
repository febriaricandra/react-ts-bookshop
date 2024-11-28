import { useState } from 'react';
import { routes, Route } from '../../utils/Route';
import { Link } from 'react-router-dom';
import {
    Clock,
    LayoutDashboard,
    MonitorCheck,
    Settings,
    ShoppingBag,
    StretchHorizontal,
    User,
} from 'lucide-react';

// Map icon names to Lucide React components
const typeIcons: Record<string, React.ElementType> = {
    home: LayoutDashboard,
    'shopping-cart': ShoppingBag,
    products: StretchHorizontal,
    clock: Clock,
    settings: Settings,
    check: MonitorCheck,
    users: User,
    user: User,
};

// Dropdown Item Component
const DropdownItem = ({ route }: { route: Route }) => {
    const Icon = typeIcons[route.icon] || null;
    return (
        <li>
            <Link
                to={route.path || '#'}
                className="flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
                {Icon && <Icon className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />}
                {route.name}
            </Link>
        </li>
    );
};

// Parent Nav Item Component
const NavItem = ({ route }: { route: Route }) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = typeIcons[route.icon] || null;

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <li>
            <div
                className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={route.children ? toggleDropdown : undefined} // Toggle only if there are children
            >
                <Link
                    to={route.path || '#'}
                    className="flex items-center w-full"
                >
                    {Icon && <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                    <span className="ms-3">{route.name}</span>
                </Link>
                {route.children && (
                    <button
                        className="text-gray-500 rounded-lg focus:outline-none"
                        aria-expanded={isOpen}
                    >
                        <svg
                            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 8l5 5 5-5H5z" />
                        </svg>
                    </button>
                )}
            </div>
            {isOpen && route.children && (
                <ul className="pl-6 space-y-2">
                    {route.children.map((child) => (
                        <DropdownItem key={child.name} route={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

// Main Navlist Component
function Navlist() {
    return (
        <ul className="space-y-2">
            {routes.map((route) => (
                <NavItem key={route.name} route={route} />
            ))}
        </ul>
    );
}

export default Navlist;
