export type Route = {
    name: string;
    icon: string;
    path?: string;
    children?: Route[];
};

export const routes: Route[] = [
    {
        name: 'Dashboard',
        icon: 'home',
        path: '/dashboard',
    },
    {
        name: 'Orders',
        icon: 'shopping-cart',
        children: [
            {
                name: 'Pending Orders',
                icon: 'clock',
                path: '/orders/pending',
            },
            {
                name: 'Completed Orders',
                icon: 'check',
                path: '/orders/completed',
            },
        ],
    },
    {
        name: 'Products',
        icon: 'products',
        path: '/products',
    },
    {
        name: 'Customers',
        icon: 'users',
        path: '/customers',
    },
    {
        name: 'Settings',
        icon: 'settings',
        children: [
            {
                name: 'Profile',
                icon: 'user',
                path: '/settings/profile',
            },
        ],
    },
];