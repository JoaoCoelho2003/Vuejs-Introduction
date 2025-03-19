<template>
  <div
    class="p-3 mb-3 border-l-4"
    :class="{
      'bg-gray-100': task.completed,
      'border-gray-300': task.priority !== 'high',
      'border-yellow-300': task.priority === 'high',
    }"
  >
    <div class="flex">
      <input type="checkbox" :checked="task.completed" @change="toggleComplete" class="mr-3 mt-1" />

      <div class="flex-1">
        <div v-if="!editing">
          <div class="flex justify-between">
            <h3 class="space-x-2">
              <span :class="{ 'line-through': task.completed }">
                {{ task.title }}
              </span>
              <span v-if="task.priority === 'high'" class="text-xs bg-yellow-300 p-1 rounded">
                High
              </span>
            </h3>

            <div>
              <button @click="editing = true" class="mr-1" title="Edit task">
                <Edit size="18" />
              </button>
              <button @click="showDeleteModal = true" class="mr-1" title="Delete task">
                <Trash2 size="18" />
              </button>
            </div>
          </div>

          <p v-if="task.description" class="text-sm mt-1">
            {{ task.description }}
          </p>

          <div class="mt-2">
            <router-link :to="`/task/${task.id}`" class="text-sm text-green-500">
              View details
            </router-link>
          </div>
        </div>

        <div v-else>
          <TaskEditForm :task="task" @save="saveEdit" @cancel="editing = false" />
        </div>
      </div>
    </div>
  </div>

  <DeleteConfirmModal
    v-if="showDeleteModal"
    @cancel="showDeleteModal = false"
    @confirm="$emit('delete-task', task.id)"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Trash2 } from 'lucide-vue-next'
import TaskEditForm from './TaskEditForm.vue'
import DeleteConfirmModal from './DeleteConfirmModal.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update-task', 'delete-task'])

const editing = ref(false)
const showDeleteModal = ref(false)

const toggleComplete = () => {
  emit('update-task', {
    ...props.task,
    completed: !props.task.completed,
  })
}

const saveEdit = (updatedTask) => {
  emit('update-task', updatedTask)
  editing.value = false
}
</script>
