import { endsWith } from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/homepage';
import Resume from './components/resume';
import ResumeEdit from './components/resume_edit';

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
    }
];

export default new Router({
    routes
});