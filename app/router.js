import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/homepage';
import Resume from './components/resume';
import ResumeEdit from './components/resume_edit';
import NotFoundPage from './components/not_found';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    }, 
    {
        path: '/add',
        component: Resume,
        name: 'resume'
    },
    {
        path: '/edit/:id',
        component: ResumeEdit,
        name: 'edit',
        props: true
    },
    { 
        path: '*', 
        component: NotFoundPage,
        name: 'notfound'
    }
];

let router = new Router({
    routes,
    mode: 'history',
    base: '/',
    fallback: true, 
});

export default router