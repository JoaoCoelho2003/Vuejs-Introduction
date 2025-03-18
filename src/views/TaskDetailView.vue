<template>
  <div class="max-w-3xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"
      ></div>
      <p class="mt-2 text-gray-600">Loading task...</p>
    </div>

    <div v-else-if="!task" class="bg-white rounded shadow p-6 text-center">
      <AlertCircle class="h-16 w-16 mx-auto mb-4 text-gray-400" />
      <h2 class="text-xl font-bold text-gray-800 mb-2">Task Not Found</h2>
      <p class="text-gray-600 mb-4">
        The task you're looking for doesn't exist or has been deleted.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        <ArrowLeft class="h-5 w-5 mr-2" />
        Back to Tasks
      </router-link>
    </div>

    <div v-else>
      <div class="flex items-center mb-4">
        <router-link to="/" class="text-emerald-600 hover:text-emerald-700 flex items-center">
          <ArrowLeft class="h-5 w-5 mr-1" />
          Back to Tasks
        </router-link>
      </div>

      <div class="bg-white rounded shadow">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ task.title }}</h1>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  "
                >
                  {{ task.completed ? 'Completed' : 'Active' }}
                </span>
                <span
                  v-if="task.priority === 'high'"
                  class="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full"
                >
                  High Priority
                </span>
                <span
                  v-if="task.dueDate"
                  class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                >
                  Due: {{ formatDate(task.dueDate) }}
                </span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                @click="confirmDelete"
                class="p-2 rounded hover:bg-gray-100"
                title="Delete task"
              >
                <Trash2 class="h-6 w-6 text-red-500" />
              </button>
            </div>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <div class="bg-gray-50 p-4 rounded">
              <p v-if="task.description" class="text-gray-700 whitespace-pre-line">
                {{ task.description }}
              </p>
              <p v-else class="text-gray-500 italic">No description provided</p>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-800 mb-2">Details</h2>
              <div class="bg-gray-50 p-4 rounded">
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div class="text-gray-500">Created:</div>
                  <div>{{ formatDateTime(task.createdAt) }}</div>

                  <div class="text-gray-500">Status:</div>
                  <div>{{ task.completed ? 'Completed' : 'Active' }}</div>

                  <div class="text-gray-500">Priority:</div>
                  <div>{{ task.priority === 'high' ? 'High' : 'Normal' }}</div>

                  <div class="text-gray-500">Due Date:</div>
                  <div>{{ task.dueDate ? formatDate(task.dueDate) : 'Not set' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded shadow w-full max-w-md p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="deleteTask"
            class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Trash2, ArrowLeft, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const showDeleteModal = ref(false)

const getTasks = () => {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
}

const task = computed(() => {
  const taskId = parseInt(route.params.id)
  return getTasks().find((t) => t.id === taskId) || null
})

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteTask = () => {
  if (!task.value) return

  const tasks = getTasks().filter((t) => t.id !== task.value.id)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  showDeleteModal.value = false
  router.push('/')
}

const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const formatDateTime = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>
