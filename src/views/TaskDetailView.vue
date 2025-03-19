<template>
  <div class="max-w-3xl mx-auto p-4">
    <div v-if="loading" class="text-center p-4">
      <p>Loading...</p>
    </div>

    <div v-else-if="!task" class="text-center p-4 border rounded">
      <AlertCircle class="mx-auto mb-2" />
      <h2 class="font-bold mb-2">Task Not Found</h2>
      <p class="mb-4">This task doesn't exist or has been deleted.</p>
      <router-link to="/" class="bg-green-500 text-white p-2 rounded inline-block">
        <ArrowLeft class="inline mr-1" />
        Back to Tasks
      </router-link>
    </div>

    <div v-else>
      <div class="mb-4">
        <router-link to="/" class="text-green-500">
          <ArrowLeft class="inline mr-1" />
          Back to Tasks
        </router-link>
      </div>

      <div class="bg-white p-4 border rounded">
        <div class="flex justify-between">
          <h1 class="font-bold text-xl mb-2">{{ task.title }}</h1>
          <button @click="showDeleteModal = true" class="text-red-500">
            <Trash2 />
          </button>
        </div>

        <div class="mb-4">
          <span
            class="mr-2 p-1 text-xs rounded"
            :class="task.completed ? 'bg-green-100' : 'bg-blue-100'"
          >
            {{ task.completed ? 'Completed' : 'Active' }}
          </span>
          <span v-if="task.priority === 'high'" class="p-1 text-xs bg-yellow-100 rounded">
            High Priority
          </span>
        </div>

        <div class="mb-4">
          <h2 class="font-bold mb-1">Description</h2>
          <p v-if="task.description" class="bg-gray-50 p-2">
            {{ task.description }}
          </p>
          <p v-else class="italic">No description provided</p>
        </div>

        <div>
          <h2 class="font-bold mb-1">Details</h2>
          <div class="bg-gray-50 p-2">
            <p>Created: {{ new Date(task.createdAt).toLocaleString() }}</p>
            <p>Status: {{ task.completed ? 'Completed' : 'Active' }}</p>
            <p>Priority: {{ task.priority === 'high' ? 'High' : 'Normal' }}</p>
          </div>
        </div>
      </div>
    </div>

    <DeleteConfirmModal
      v-if="showDeleteModal"
      @cancel="showDeleteModal = false"
      @confirm="deleteTask"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Trash2, ArrowLeft, AlertCircle } from 'lucide-vue-next'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'

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

const deleteTask = () => {
  if (!task.value) return

  const tasks = getTasks().filter((t) => t.id !== task.value.id)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  showDeleteModal.value = false
  router.push('/')
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>
