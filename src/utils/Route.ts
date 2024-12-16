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
        path: '/admin',
    },
    {
        name: 'Orders',
        icon: 'shopping-cart',
        path: '/orders',
    },
    {
        name: 'Products',
        icon: 'products',
        children: [
            {
                name: 'All Products',
                icon: 'check',
                path: '/products/all',
            },
        ]
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