<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Task Manager</h1>
      <p class="text-gray-600">
        Stay organized and boost your productivity with this simple task management app.
      </p>
    </div>

    <TaskForm @add-task="addNewTask" />

    <TaskList :tasks="tasks" @update-task="updateTask" @delete-task="deleteTask" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'

const savedTasks = localStorage.getItem('tasks')
const initialTasks = savedTasks ? JSON.parse(savedTasks) : []

const tasks = ref(initialTasks)

const addNewTask = (task) => {
  tasks.value.unshift(task)
}

const updateTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
}

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true },
)

onMounted(() => {
  if (tasks.value.length === 0) {
    const now = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(now.getDate() + 1)

    tasks.value = [
      {
        id: 1,
        title: 'Learn Vue 3 Composition API',
        description: 'Study the script setup syntax and reactivity system',
        completed: false,
        priority: 'high',
        dueDate: tomorrow.toISOString().split('T')[0],
        createdAt: now.toISOString(),
      },
      {
        id: 2,
        title: 'Build a task manager app',
        description: 'Create a simple task manager to practice Vue concepts',
        completed: false,
        priority: 'normal',
        dueDate: null,
        createdAt: now.toISOString(),
      },
      {
        id: 3,
        title: 'Master Tailwind CSS',
        description: 'Learn utility-first CSS framework for rapid UI development',
        completed: true,
        priority: 'normal',
        dueDate: null,
        createdAt: now.toISOString(),
      },
    ]
  }
})
</script>
