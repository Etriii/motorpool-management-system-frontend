import { createRouter, createWebHistory } from "vue-router";//createWebHashHistory, 
import type { RouteRecordRaw } from 'vue-router'

import AuthenticatedLayout from "@layouts/AuthenticatedLayout.vue";

import { MyAccount, Login, AccountRecovery, PageNotFound, AccountRecoveryConfirmaion, Unauthorized, HomePage } from '@pages/index.ts';

import LogInSignupLayout from "@layouts/LogInSignupLayout.vue";
// import { Roles } from "@core/constants";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/',
        component: AuthenticatedLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'my-account',
                name: 'My account',
                component: MyAccount,
                meta: { pageTitle: 'My account' },
            },
            {
                path: 'admin',
                children: [
                    // {
                    //     path: '/',
                    //     name: 'Dashboard',
                    //     component: AdminDashboard,
                    //     meta: { pageTitle: 'Admin Dashboard' },
                    // }, IN CONSIDERATOIN PA KAY MA TANGGONG SA 
                ]
            },
        ],
    },
    {
        path: '/unauthorized',
        component: Unauthorized,
        meta: { requiresAuth: true },
    },
    {
        path: '/auth',
        component: LogInSignupLayout,
        children: [
            {
                path: 'login',
                name: 'Log In | MMS',
                component: Login,
                meta: { pageTitle: 'Dashboard' }
            },
            {
                path: 'account-recovery',
                name: 'Account Recovery',
                component: AccountRecovery,
                meta: { pageTitle: 'AccountRecovery' }
            },
            {
                path: 'account-recovery/confirmation',
                name: 'Account Recovery Confirmation',
                component: AccountRecoveryConfirmaion,
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});


router.beforeEach(async (to, _from, next) => {
    // const { user } = useAuth();
    // const authStore = useAuthStore();

    // if (!authStore.initialized) {
    //     await authStore.initialize();
    // }

    // const isLoggedIn = !!authStore.user;

    // if (to.meta.requiresAuth && !isLoggedIn) {
    //     return next("/auth/login");
    // }

    // if (to.path.startsWith("/auth") && isLoggedIn) {
    //     return next("/");
    // }

    // const allowedRoles = to.meta.roles as string[] | undefined
    // if (allowedRoles && user.value?.groups) {
    //     const hasAccess = user.value.groups.some((role: string) =>
    //         allowedRoles.includes(role)
    //     )
    //     if (!hasAccess) {
    //         return next("/unauthorized")
    //     }
    // }

    next();
});



export default router;