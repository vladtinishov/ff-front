import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrdersView from '../views/OrdersView.vue'
import OrderView from '../views/OrderView.vue'
import FreelancerPageView from '../views/FreelancerPageView.vue'
import CustomerSignupView from '../views/CustomerSignupView.vue'
import FreelanceSignupView from '../views/FreelanceSignupView.vue'
import UserPageView from '../views/UserPageView.vue'
import ApplicationView from '../views/ApplicationView.vue'
import UserSettingsView from '../views/UserSettingsView.vue'
import OrderPageView from '../views/OrderPageView.vue'
import OrderProgressView from '../views/OrderProgressView.vue'
import ClickedOrdersView from '../views/ClickedOrdersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup-customer',
      name: 'signup-customer',
      component: CustomerSignupView
    },
    {
      path: '/signup-freelancer',
      name: 'signup-freelancer',
      component: FreelanceSignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/freelancer/:id',
      name: 'freelancer-page',
      component: FreelancerPageView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/orders/:id',
      name: 'order',
      component: OrderView
    },
    {
      path: '/me',
      name: 'me',
      component: UserPageView
    },
    {
      path: '/me/order/:id',
      name: 'order-page',
      component: OrderPageView
    },
    {
      path: '/application/:id',
      name: 'application',
      component: ApplicationView
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      component: UserSettingsView
    },
    {
      path: '/order-progress/:id',
      name: 'order-progress',
      component: OrderProgressView
    },
    {
      path: '/clicked-orders',
      name: 'clicked-orders',
      component: ClickedOrdersView
    },
    
    
  ]
})

export default router
