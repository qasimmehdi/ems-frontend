import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Menu',
        permissions: 'ADMIN DEVELOPER',
        access: false,
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                permissions: 'ADMIN',
                access: false,
                type: 'item',
                icon: 'dashboard',
                url: '/dashboard'
            },
            {
                id: 'attendance',
                title: 'Attendance',
                type: 'item',
                icon: 'dashboard',
                url: '/attendance'
            },
        ]
    }
];
