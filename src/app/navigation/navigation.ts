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
                id: 'trainers',
                title: 'Trainer Management',
                type: 'item',
                icon: 'accessibility',
                url: '/trainers'
            },
            {
                id: 'users',
                title: 'User Management',
                type: 'item',
                icon: 'person',
                url: '/users'
            },
            {
                id: 'reported',
                title: 'Reported Users',
                type: 'item',
                url: '/reported',
                icon: 'report'
            },
            /* {
                id: 'teams',
                title: 'Teams',
                type: 'item',
                url: '/teams',
                icon: 'people'
            }, */
            {
                id: 'feedback',
                title: 'Feedback Management',
                type: 'item',
                url: '/feedback',
                icon: 'feedback'
            },
            {
                id: 'calendar',
                title: 'Trainer\'s Calender',
                type: 'item',
                url: '/calendar',
                icon: 'calendar_today'
            },
            {
                id: 'session',
                title: 'Session Management',
                type: 'item',
                url: '/session',
                icon: 'fitness_center'
            },
            {
                id: 'notification',
                title: 'Bulk Notifications',
                type: 'item',
                url: '/notifications',
                icon: 'notifications'
            },
            {
                id: 'finance',
                title: 'Finance',
                type: 'item',
                url: '/finance',
                icon: 'payments'
            },
            {
                id: 'setting',
                title: 'Settings',
                type: 'item',
                url: '/settings',
                icon: 'settings'
            }
            // {
            //     id: 'setting',
            //     title: 'Settings',
            //     type: 'collapsable',
            //     access: false,
            //     icon: 'settings',
            //     children: [
            //         {
            //             id: 'pages',
            //             title: 'Pages',
            //             type: 'collapsable',
            //             children: [
            //                 {
            //                     id: 'page-about',
            //                     title: 'About',
            //                     type: 'item',
            //                     url: '/settings/page/about'
            //                 },
            //                 {
            //                     id: 'page-privacy-policy',
            //                     title: 'Privacy Policy',
            //                     type: 'item',
            //                     url: '/settings/page/privacy-policy'
            //                 },
            //                 {
            //                     id: 'term-and-condition',
            //                     title: 'Term & Condition',
            //                     type: 'item',
            //                     url: '/settings/page/term-and-condition'
            //                 }
            //             ]
            //         },
            //         {
            //             id: 'gym-settings',
            //             title: 'Gyms',
            //             type: 'collapsable',
            //             children: [
            //                 // {
            //                 //     id   : 'settings-offers',
            //                 //     title: 'Offers',
            //                 //     type : 'item',
            //                 //     url  : '/subscriptions'
            //                 // },
            //                 {
            //                     id: 'amenities',
            //                     title: 'Amenities',
            //                     type: 'item',
            //                     url: '/aminities'
            //                 }
            //             ]
            //         },
            //         {
            //             id: 'teams',
            //             title: 'Teams',
            //             type: 'item',
            //             url: '/teams'
            //         },
            //         {
            //             id: 'general-settings',
            //             title: 'General',
            //             type: 'item',
            //             url: '/settings/default/default'
            //         },
            //         // {
            //         //     id: 'settings-accounts',
            //         //     title: 'Account',
            //         //     type: 'item',
            //         //     url: '/settings/accounts/38723'
            //         // }
            //     ]
            // }
        ]
    }
];
