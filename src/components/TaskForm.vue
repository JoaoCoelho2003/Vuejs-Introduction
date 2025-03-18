<template>
  <div class="bg-white rounded shadow p-6 mb-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>

    <form @submit.prevent="addTask">
      <div class="mb-4">
        <label for="taskTitle" class="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>
        <input
          id="taskTitle"
          v-model="newTaskTitle"
          type="text"
          placeholder="What needs to be done?"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500"
          :class="{ 'border-red-500': titleError }"
        />
        <p v-if="titleError" class="mt-1 text-sm text-red-500">
          {{ titleError }}
        </p>
      </div>

      <div class="mb-4">
        <label for="taskDescription" class="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          id="taskDescription"
          v-model="description"
          rows="3"
          placeholder="Add some details about this task..."
          class="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500"
        ></textarea>
      </div>

      <div class="flex flex-wrap gap-4 mb-4">
        <div class="flex items-center">
          <input id="taskPriority" v-model="isHighPriority" type="checkbox" class="w-4 h-4" />
          <label for="taskPriority" class="ml-2 text-sm text-gray-700"> High priority </label>
        </div>

        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            id="dueDate"
            v-model="dueDate"
            type="date"
            class="p-1 border rounded focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center gap-2"
        >
          <PlusIcon class="h-5 w-5" />
          Add Task
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon } from 'lucide-vue-next'

const emit = defineEmits(['add-task'])

const newTaskTitle = ref('')
const description = ref('')
const isHighPriority = ref(false)
const dueDate = ref('')
const titleError = ref('')

const addTask = () => {
  if (!newTaskTitle.value.trim()) {
    titleError.value = 'Task title cannot be empty'
    return
  }

  titleError.value = ''

  const newTask = {
    id: Date.now(),
    title: newTaskTitle.value.trim(),
    description: description.value,
    completed: false,
    priority: isHighPriority.value ? 'high' : 'normal',
    dueDate: dueDate.value || null,
    createdAt: new Date().toISOString(),
  }

  emit('add-task', newTask)

  newTaskTitle.value = ''
  description.value = ''
  isHighPriority.value = false
  dueDate.value = ''
}
</script>
