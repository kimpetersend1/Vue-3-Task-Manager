import {createRouter, createWebHistory} from 'vue-router'
import TaskList from '@/views/TaskList.vue'
import AppInfo from '@/views/AppInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskList
    },
    {
      path: '/info',
      component: AppInfo
    }
  ]
})

export default router
