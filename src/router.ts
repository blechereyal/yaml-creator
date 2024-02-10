
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue';

export const navigation = [
    { name: 'Dashboard', path: '/', component: Home },
    { name: 'Team', path: '/team', component: { template: "<div>test</div>" } },
  ]

export const router = createRouter({
history: createWebHashHistory(),
routes: navigation, // short for `routes: routes`
});