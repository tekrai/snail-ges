import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        name: 'login'
    },
    {
        path: '/',
        component: () => import('../layouts/AppLayout.vue'), // This is your AppLayout
        children: [
            {
                path: '',
                component: () => import('../views/Dashboard.vue'),
                name: 'dashboard'
            },
            {
                path: '/calendar',
                component: () => import('../views/Calendar.vue'),
                name: 'calendar'
            },
            {
                path: '/projects',
                component: () => import('../views/Projects.vue'),
                name: 'projects'
            },
            {
                path: '/grades',
                component: () => import('../views/Grades.vue'),
                name: 'grades'
            },
            {
                path: '/absences',
                component: () => import('../views/Absences.vue'),
                name: 'absences'
            },
            {
                path: '/documents',
                component: () => import('../views/Documents.vue'),
                name: 'documents',
            },
            {
                path: '/subjects',
                component: () => import('../views/Subjects.vue'),
                name: 'subjects',
            },
            {
                path: '/profile',
                component: () => import('../views/Profile.vue'),
                name: 'profile'
            },
            {
                path: '/contacts',
                component: () => import('../views/Contacts.vue'),
                name: 'contacts'
            },
            // Add other child routes here
        ]
    }
    // ... other routes
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;