import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskDetailView from '../views/TaskDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Task Manager - Home',
    },
  },
  {
    path: '/task/:id',
    name: 'task-detail',
    component: TaskDetailView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue Task Manager'
  next()
})

export default router
