<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Task Manager</h1>
    <p class="mb-6">A simple app to manage your tasks</p>

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

    tasks.value = [
      {
        id: 1,
        title: 'Learn Vue 3',
        description: 'Study the basics',
        completed: false,
        priority: 'high',
        createdAt: now.toISOString(),
      },
      {
        id: 2,
        title: 'Build a task app',
        description: 'Create a simple app',
        completed: false,
        priority: 'normal',
        createdAt: now.toISOString(),
      },
      {
        id: 3,
        title: 'Learn Tailwind',
        description: 'Study CSS framework',
        completed: true,
        priority: 'normal',
        createdAt: now.toISOString(),
      },
    ]
  }
})
</script>
