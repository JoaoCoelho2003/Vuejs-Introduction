<template>
  <div class="bg-white p-4 mb-4 border rounded">
    <h2 class="font-bold mb-4">Add New Task</h2>

    <form @submit.prevent="addTask">
      <div class="mb-4">
        <label for="taskTitle" class="block mb-1">Task Title</label>
        <input
          id="taskTitle"
          v-model="title"
          type="text"
          placeholder="Enter task title"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label for="taskDescription" class="block mb-1">Description</label>
        <textarea
          id="taskDescription"
          v-model="description"
          rows="2"
          placeholder="Task description"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>

      <div class="mb-4">
        <input id="taskPriority" v-model="isHighPriority" type="checkbox" />
        <label for="taskPriority" class="ml-2">High priority</label>
      </div>

      <button type="submit" class="bg-green-500 text-white p-2 rounded flex items-center">
        <Plus class="mr-1" />
        Add Task
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'

const emit = defineEmits(['add-task'])

const title = ref('')
const description = ref('')
const isHighPriority = ref(false)

const addTask = () => {
  if (!title.value.trim()) return

  const newTask = {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value,
    completed: false,
    priority: isHighPriority.value ? 'high' : 'normal',
    createdAt: new Date().toISOString(),
  }

  emit('add-task', newTask)

  title.value = ''
  description.value = ''
  isHighPriority.value = false
}
</script>
