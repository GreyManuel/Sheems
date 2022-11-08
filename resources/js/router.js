import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        /**
         * Auth
         */
        {
            path: '/login',
            component: () => import(/* webpackChunkName: 'Login' */ './components/auth/Login'),
            props: true
        },
        {
            path: '/home',
            name: 'home',
            props: true,
            component: () => import(/* webpackChunkName: 'Home' */ './components/users/Index'),
            children: [
                {
                    path: 'all',
                    name: 'homeAll',
                    component: () => import(/* webpackChunkName: 'The Table Home' */ './components/users/TheTable')
                },
                {
                    path: 'clock',
                    name: 'clock',
                    props: true,
                    component: () => import(/* webpackChunkName: 'Clock' */ './components/users/Clock'),
                    children: [
                        {
                            path: ':slug',
                            name: 'clockUser',
                            props: true,
                            component: () => import(/* webpackChunkName: 'Clock User' */ './components/users/User')
                        }
                    ]
                }
            ]
        },
        {
            path: '/reports',
            name: 'reports',
            props: true,
            component: () => import(/* webpackChunkName: 'Reports' */ './components/reports/Index'),
            children: [
                {
                    path: ':slug',
                    name: 'shiftDetails',
                    props: true,
                    component: () => import(/* webpackChunkName: 'Shift Details' */ './components/reports/details'),
                    children: [
                        {
                            path: ':type',
                            name: 'userReports',
                            props: true,
                            component: () => import(/* webpackChunkName: 'User Reports'*/ './components/reports/TheTable')
                        }
                    ]
                }
            ]
        }
    ],
});
