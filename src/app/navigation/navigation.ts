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
                id: 'leagues',
                title: 'Leagues',
                type: 'item',
                icon: 'dashboard',
                url: '/leagues'
            },
            {
                id: 'leaderboard',
                title: 'Leaderboard',
                type: 'item',
                icon: 'dashboard',
                url: '/leaderboard'
            },
            {
                id: 'howtoplay',
                title: 'How To Play',
                type: 'item',
                icon: 'dashboard',
                url: '/how-to-play'
            },
            {
                id: 'about',
                title: 'About',
                type: 'item',
                icon: 'dashboard',
                url: '/about'
            },
        ]
    }
];
