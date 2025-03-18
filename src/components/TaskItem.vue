<template>
  <div
    class="bg-white rounded p-4 mb-3 border-l-4 hover:shadow"
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
          class="w-5 h-5 rounded-full"
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
              class="text-gray-800"
            >
              {{ task.title }}
              <span
                v-if="task.priority === 'high' && !task.completed"
                class="ml-2 inline-block px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full"
              >
                High Priority
              </span>
            </h3>

            <div class="flex gap-1 opacity-0 group-hover:opacity-100">
              <button
                @click="startEdit"
                class="p-1 text-gray-500 hover:text-emerald-600 rounded hover:bg-gray-100"
                title="Edit task"
              >
                <Edit class="h-5 w-5" />
              </button>
              <button
                @click="$emit('delete-task', task.id)"
                class="p-1 text-gray-500 hover:text-red-600 rounded hover:bg-gray-100"
                title="Delete task"
              >
                <Trash2 class="h-5 w-5" />
              </button>
              <router-link
                :to="`/task/${task.id}`"
                class="p-1 text-gray-500 hover:text-blue-600 rounded hover:bg-gray-100"
                title="View details"
              >
                <Search class="h-5 w-5" />
              </router-link>
            </div>
          </div>

          <p
            v-if="task.description"
            class="mt-1 text-sm text-gray-600"
            :class="{ 'text-gray-400': task.completed }"
          >
            {{ truncateDescription(task.description) }}
          </p>

          <div class="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
            <div v-if="task.dueDate" class="flex items-center gap-1">
              <Calendar class="h-4 w-4" />
              Due: {{ formatDate(task.dueDate) }}
            </div>
            <div class="flex items-center gap-1">
              <Clock class="h-4 w-4" />
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
            class="w-full p-2 border rounded mb-2"
          />

          <textarea
            v-model="editedDescription"
            rows="2"
            class="w-full p-2 border rounded mb-2 text-sm"
            placeholder="Task description (optional)"
          ></textarea>

          <div class="flex items-center gap-3 mb-2">
            <input id="editPriority" v-model="editedPriority" type="checkbox" class="w-4 h-4" />
            <label for="editPriority" class="text-sm text-gray-700"> High priority </label>

            <input v-model="editedDueDate" type="date" class="ml-auto p-1 border rounded text-sm" />
          </div>

          <div class="flex justify-end gap-2">
            <button
              @click="cancelEdit"
              class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="saveEdit"
              class="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
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
import { ref, nextTick } from 'vue'
import { Edit, Trash2, Search, Calendar, Clock } from 'lucide-vue-next'

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
</script>
