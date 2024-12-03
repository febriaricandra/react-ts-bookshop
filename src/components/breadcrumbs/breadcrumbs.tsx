import { Link, useLocation } from "react-router-dom";
import { Route } from "../../utils/Route";

const findPathHierarchy = (routes: Route[], currentPath: string): Route[] => {
    for (const route of routes) {
        if (route.path === currentPath) {
            return [route];
        }

        if (route.children) {
            const foundPath = findPathHierarchy(route.children, currentPath);
            if (foundPath.length) {
                return [route, ...foundPath];
            }
        }
    }

    return [];
}

const Breadcrumbs = ({ routes }: { routes: Route[] }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const pathHierarchy = findPathHierarchy(routes, currentPath);

    return (
        <nav className="inline-flex px-5 py-3 text-white border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {pathHierarchy.map((route, index) => (
                    <li className="inline-flex items-center" key={route.name}>
                        {index < pathHierarchy.length - 1 ? (
                            <Link to={route.path!} className="text-white hover:text-gray-700 dark:hover:text-gray-200">
                                {route.name}
                            </Link>
                        ) : (
                            <span>{route.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;