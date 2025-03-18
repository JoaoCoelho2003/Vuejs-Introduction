<template>
  <div class="bg-white rounded shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">My Tasks</h2>
      <TaskFilter v-model="activeFilter" :counts="filterCounts" />
    </div>

    <div v-if="filteredTasks.length === 0" class="py-8 text-center text-gray-500">
      <XSquare class="h-12 w-12 mx-auto mb-3 text-gray-300" />
      <p>No tasks to display</p>
      <p class="text-sm mt-1">
        {{
          activeFilter === 'all'
            ? 'Add a new task to get started!'
            : `No ${activeFilter} tasks found.`
        }}
      </p>
    </div>

    <TransitionGroup name="list" tag="div" class="space-y-3">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @update-task="updateTask"
        @delete-task="deleteTask"
      />
    </TransitionGroup>

    <TaskStats v-if="tasks.length > 0" :tasks="tasks" class="mt-6" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XSquare } from 'lucide-vue-next'
import TaskItem from './TaskItem.vue'
import TaskFilter from './TaskFilter.vue'
import TaskStats from './TaskStats.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update-task', 'delete-task'])

const activeFilter = ref('all')

const filteredTasks = computed(() => {
  switch (activeFilter.value) {
    case 'active':
      return props.tasks.filter((task) => !task.completed)
    case 'completed':
      return props.tasks.filter((task) => task.completed)
    default:
      return props.tasks
  }
})

const filterCounts = computed(() => {
  return {
    all: props.tasks.length,
    active: props.tasks.filter((task) => !task.completed).length,
    completed: props.tasks.filter((task) => task.completed).length,
  }
})

const updateTask = (updatedTask) => {
  emit('update-task', updatedTask)
}

const deleteTask = (taskId) => {
  emit('delete-task', taskId)
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
