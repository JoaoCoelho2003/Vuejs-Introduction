<template>
  <div class="max-w-3xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"
      ></div>
      <p class="mt-2 text-gray-600">Loading task...</p>
    </div>

    <div v-else-if="!task" class="bg-white rounded-lg shadow-md p-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto mb-4 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h2 class="text-xl font-bold text-gray-800 mb-2">Task Not Found</h2>
      <p class="text-gray-600 mb-4">
        The task you're looking for doesn't exist or has been deleted.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Tasks
      </router-link>
    </div>

    <div v-else>
      <div class="flex items-center mb-4">
        <router-link to="/" class="text-emerald-600 hover:text-emerald-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Tasks
        </router-link>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-800 mb-2 break-words">{{ task.title }}</h1>
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
                @click="toggleComplete"
                class="p-2 rounded-full hover:bg-gray-100"
                :title="task.completed ? 'Mark as incomplete' : 'Mark as complete'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  :class="task.completed ? 'text-green-500' : 'text-gray-400'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </button>
              <button
                @click="editTask"
                class="p-2 rounded-full hover:bg-gray-100"
                title="Edit task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button
                @click="confirmDelete"
                class="p-2 rounded-full hover:bg-gray-100"
                title="Delete task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p v-if="task.description" class="text-gray-700 whitespace-pre-line">
                {{ task.description }}
              </p>
              <p v-else class="text-gray-500 italic">No description provided</p>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-800 mb-2">Details</h2>
              <div class="bg-gray-50 p-4 rounded-lg">
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

            <div>
              <h2 class="text-lg font-semibold text-gray-800 mb-2">Actions</h2>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="space-y-2">
                  <button
                    @click="toggleComplete"
                    class="w-full px-4 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {{ task.completed ? 'Mark as Incomplete' : 'Mark as Complete' }}
                  </button>

                  <button
                    @click="editTask"
                    class="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Task
                  </button>

                  <button
                    @click="confirmDelete"
                    class="w-full px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                    </svg>
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="deleteTask"
            class="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
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

const toggleComplete = () => {
  if (!task.value) return

  const tasks = getTasks()
  const index = tasks.findIndex((t) => t.id === task.value.id)

  if (index !== -1) {
    tasks[index] = {
      ...tasks[index],
      completed: !tasks[index].completed,
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 100)
  }
}

const editTask = () => {
  router.push('/')
}

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
