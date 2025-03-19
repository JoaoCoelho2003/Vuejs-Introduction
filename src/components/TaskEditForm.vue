<template>
  <div>
    <input
      v-model="title"
      class="w-full p-2 border mb-2"
      placeholder="Task title"
      ref="titleInput"
    />

    <textarea
      v-model="description"
      rows="2"
      class="w-full p-2 border mb-2"
      placeholder="Description"
    ></textarea>

    <div class="mb-2">
      <input id="priority" v-model="isHighPriority" type="checkbox" />
      <label for="priority" class="ml-2">High priority</label>
    </div>

    <div>
      <button @click="$emit('cancel')" class="bg-gray-200 p-1 mr-2">Cancel</button>
      <button @click="save" class="bg-green-500 text-white p-1">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save', 'cancel'])

const title = ref(props.task.title)
const description = ref(props.task.description || '')
const isHighPriority = ref(props.task.priority === 'high')
const titleInput = ref(null)

const save = () => {
  if (!title.value.trim()) return

  emit('save', {
    ...props.task,
    title: title.value.trim(),
    description: description.value,
    priority: isHighPriority.value ? 'high' : 'normal',
  })
}

onMounted(() => {
  titleInput.value.focus()
})
</script>
