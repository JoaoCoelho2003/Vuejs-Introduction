<template>
  <div class="bg-white p-4 border rounded">
    <h2 class="font-bold mb-4">My Tasks</h2>

    <div class="mb-4">
      <button
        @click="filter = 'all'"
        class="mr-2 p-1"
        :class="filter === 'all' ? 'bg-green-400 rounded-xl px-4' : ''"
      >
        All ({{ tasks.length }})
      </button>
      <button
        @click="filter = 'active'"
        class="mr-2 p-1"
        :class="filter === 'active' ? 'bg-green-400 rounded-xl px-4' : ''"
      >
        Active ({{ activeTasks.length }})
      </button>
      <button
        @click="filter = 'completed'"
        class="p-1"
        :class="filter === 'completed' ? 'bg-green-400 rounded-xl px-4' : ''"
      >
        Completed ({{ completedTasks.length }})
      </button>
    </div>

    <div v-if="filteredTasks.length === 0" class="text-center p-4">
      <p>No tasks to display</p>
    </div>

    <div v-else>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @update-task="$emit('update-task', $event)"
        @delete-task="$emit('delete-task', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

defineEmits(['update-task', 'delete-task'])

const filter = ref('all')

const activeTasks = computed(() => {
  return props.tasks.filter((task) => !task.completed)
})

const completedTasks = computed(() => {
  return props.tasks.filter((task) => task.completed)
})

const filteredTasks = computed(() => {
  if (filter.value === 'active') return activeTasks.value
  if (filter.value === 'completed') return completedTasks.value
  return props.tasks
})
</script>
