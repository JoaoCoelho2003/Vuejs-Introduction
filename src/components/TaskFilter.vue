<template>
  <div class="flex items-center">
    <div class="inline-flex rounded shadow-sm" role="group">
      <button
        type="button"
        @click="updateFilter('all')"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-l-lg',
          modelValue === 'all'
            ? 'bg-emerald-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100',
        ]"
      >
        All
        <span
          class="ml-1 px-1.5 py-0.5 text-xs rounded-full"
          :class="modelValue === 'all' ? 'bg-emerald-500' : 'bg-gray-200'"
        >
          {{ counts.all }}
        </span>
      </button>
      <button
        type="button"
        @click="updateFilter('active')"
        :class="[
          'px-4 py-2 text-sm font-medium',
          modelValue === 'active'
            ? 'bg-emerald-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100',
        ]"
      >
        Active
        <span
          class="ml-1 px-1.5 py-0.5 text-xs rounded-full"
          :class="modelValue === 'active' ? 'bg-emerald-500' : 'bg-gray-200'"
        >
          {{ counts.active }}
        </span>
      </button>
      <button
        type="button"
        @click="updateFilter('completed')"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-r-lg',
          modelValue === 'completed'
            ? 'bg-emerald-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100',
        ]"
      >
        Completed
        <span
          class="ml-1 px-1.5 py-0.5 text-xs rounded-full"
          :class="modelValue === 'completed' ? 'bg-emerald-500' : 'bg-gray-200'"
        >
          {{ counts.completed }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'all',
  },
  counts: {
    type: Object,
    default: () => ({
      all: 0,
      active: 0,
      completed: 0,
    }),
  },
})

const emit = defineEmits(['update:modelValue'])

const updateFilter = (filter) => {
  emit('update:modelValue', filter)
}
</script>
