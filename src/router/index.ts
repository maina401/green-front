import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddItemView from "@/views/AddItemView.vue";
import EventView from "@/views/EventView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/events',
      name: 'events',
      component: EventView
    },
    {
      path: '/event/add',
      name: 'add-event',
      component: AddEventView
    }, {
      path: '/item/add',
      name: 'add-item',
      component: AddItemView
    },{
      path: '/item/edit/:id',
      name: 'edit-item',
      component: AddItemView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
