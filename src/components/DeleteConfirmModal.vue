<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white p-4 rounded max-w-sm">
      <h3 class="font-bold mb-2">Confirm Delete</h3>
      <p class="mb-4">Are you sure you want to delete this task?</p>
      <div class="flex justify-end">
        <button @click="$emit('cancel')" class="bg-gray-200 p-2 mr-2">Cancel</button>
        <button @click="$emit('confirm')" class="bg-red-500 text-white p-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['cancel', 'confirm'])
</script>
