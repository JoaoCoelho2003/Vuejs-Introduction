<template>
  <div class="border-t pt-4 mt-4">
    <h3 class="text-sm font-medium text-gray-700 mb-3">Task Statistics</h3>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-gray-50 p-3 rounded">
        <div class="text-xs text-gray-500 mb-1">Completion Rate</div>
        <div class="flex items-center">
          <div class="text-lg font-semibold">{{ completionRate }}%</div>
          <div class="ml-auto">
            <svg class="w-8 h-8" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                stroke-width="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                stroke-width="3"
                :stroke-dasharray="`${completionRate}, 100`"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-3 rounded">
        <div class="text-xs text-gray-500 mb-1">High Priority</div>
        <div class="flex items-center">
          <div class="text-lg font-semibold">{{ highPriorityCount }}</div>
          <div class="text-sm text-gray-500 ml-1">tasks</div>
          <div
            v-if="highPriorityCount > 0"
            class="ml-auto px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full"
          >
            {{ highPriorityPercentage }}%
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-3 rounded">
        <div class="text-xs text-gray-500 mb-1">Due Soon</div>
        <div class="flex items-center">
          <div class="text-lg font-semibold">{{ dueSoonCount }}</div>
          <div class="text-sm text-gray-500 ml-1">tasks</div>
          <div
            v-if="dueSoonCount > 0"
            class="ml-auto px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full"
          >
            Next 7 days
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const completedCount = computed(() => {
  return props.tasks.filter((task) => task.completed).length
})

const completionRate = computed(() => {
  if (props.tasks.length === 0) return 0
  return Math.round((completedCount.value / props.tasks.length) * 100)
})

const highPriorityCount = computed(() => {
  return props.tasks.filter((task) => task.priority === 'high' && !task.completed).length
})

const highPriorityPercentage = computed(() => {
  const activeTasksCount = props.tasks.filter((task) => !task.completed).length
  if (activeTasksCount === 0) return 0
  return Math.round((highPriorityCount.value / activeTasksCount) * 100)
})

const dueSoonCount = computed(() => {
  const today = new Date()
  const nextWeek = new Date()
  nextWeek.setDate(today.getDate() + 7)

  return props.tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false

    const dueDate = new Date(task.dueDate)
    return dueDate >= today && dueDate <= nextWeek
  }).length
})
</script>
