import { createRouter, createWebHistory } from 'vue-router'
import login from './login.vue'
import signup from './signup.vue'
import sidebar from './sidebar.vue'
import headerSection from './headerSection.vue'
// import contactTable from  './contactTable.vue'
import AppMenu from './AppMenu.vue'
import tagsTable from './tagsTable.vue'


const router = createRouter({
  history: createWebHistory(), //use to store the history of navigated routes 
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/signup', //its a pathway in the url to be display
      name: 'signup',     //
      component:signup,   //components that need to be display in this path 
    },
    {
      path:'/contactTable',
      name:'contacTable',
      component: () => import('./contactTable.vue')
    },
    {
      path:'/tags',
      name:'tagsTable',
      component:tagsTable
    },
    {
      path:'/home',
      name:'AppMenu',
      component:()=>import('./AppMenu.vue'),
      children:[
        {path:'',components:{headerSection:headerSection, sidebar:sidebar}},
      ],
    }
  ],
})
export default router;