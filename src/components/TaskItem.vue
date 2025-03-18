<template>
  <div
    class="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 transition-all duration-200 hover:shadow-md"
    :class="{
      'border-emerald-500': !task.completed && task.priority === 'normal',
      'border-amber-500': !task.completed && task.priority === 'high',
      'border-gray-300 bg-gray-50': task.completed,
    }"
  >
    <div class="flex items-start gap-3">
      <div class="pt-1">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleComplete"
          class="w-5 h-5 rounded-full accent-emerald-600 cursor-pointer"
        />
      </div>

      <div class="flex-1">
        <div v-if="!editing" class="group">
          <div class="flex items-center justify-between">
            <h3
              :class="{
                'line-through text-gray-500': task.completed,
                'font-medium': !task.completed,
              }"
              class="text-gray-800 break-words"
            >
              {{ task.title }}
              <span
                v-if="task.priority === 'high' && !task.completed"
                class="ml-2 inline-block px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full"
              >
                High Priority
              </span>
            </h3>

            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="startEdit"
                class="p-1 text-gray-500 hover:text-emerald-600 rounded-full hover:bg-gray-100"
                title="Edit task"
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
              </button>
              <button
                @click="$emit('delete-task', task.id)"
                class="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                title="Delete task"
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
              </button>
              <router-link
                :to="`/task/${task.id}`"
                class="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
                title="View details"
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </router-link>
            </div>
          </div>

          <p
            v-if="task.description"
            class="mt-1 text-sm text-gray-600 break-words"
            :class="{ 'text-gray-400': task.completed }"
          >
            {{ truncateDescription(task.description) }}
          </p>

          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <div v-if="task.dueDate" class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Due: {{ formatDate(task.dueDate) }}
            </div>
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Created: {{ formatDate(task.createdAt) }}
            </div>
          </div>
        </div>

        <div v-else>
          <input
            v-model="editedTitle"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            ref="editInput"
            class="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
          />

          <textarea
            v-model="editedDescription"
            rows="2"
            class="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 text-sm"
            placeholder="Task description (optional)"
          ></textarea>

          <div class="flex items-center gap-3 mb-2">
            <input
              id="editPriority"
              v-model="editedPriority"
              type="checkbox"
              class="w-4 h-4 accent-emerald-600"
            />
            <label for="editPriority" class="text-sm text-gray-700"> High priority </label>

            <input
              v-model="editedDueDate"
              type="date"
              class="ml-auto px-2 py-1 border rounded text-sm"
            />
          </div>

          <div class="flex justify-end gap-2">
            <button
              @click="cancelEdit"
              class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="saveEdit"
              class="px-3 py-1 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update-task', 'delete-task'])

const editing = ref(false)
const editedTitle = ref('')
const editedDescription = ref('')
const editedPriority = ref(false)
const editedDueDate = ref('')
const editInput = ref(null)

// Methods
const toggleComplete = () => {
  emit('update-task', {
    ...props.task,
    completed: !props.task.completed,
  })
}

const startEdit = async () => {
  editedTitle.value = props.task.title
  editedDescription.value = props.task.description || ''
  editedPriority.value = props.task.priority === 'high'
  editedDueDate.value = props.task.dueDate || ''
  editing.value = true

  await nextTick()
  editInput.value.focus()
}

const saveEdit = () => {
  if (!editedTitle.value.trim()) {
    return
  }

  emit('update-task', {
    ...props.task,
    title: editedTitle.value.trim(),
    description: editedDescription.value.trim(),
    priority: editedPriority.value ? 'high' : 'normal',
    dueDate: editedDueDate.value || null,
  })

  editing.value = false
}

const cancelEdit = () => {
  editing.value = false
}

const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  }).format(date)
}

const truncateDescription = (text) => {
  if (!text) return ''
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}

watch(
  () => props.task,
  (newTask) => {
    console.log('Task updated:', newTask)
  },
  { deep: true },
)

onMounted(() => {
  console.log('TaskItem component mounted')
})
</script>
