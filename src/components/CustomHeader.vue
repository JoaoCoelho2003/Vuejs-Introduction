<template>
  <header class="bg-emerald-600 text-white shadow">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold flex items-center gap-2">
          <CheckCircle class="h-7 w-7" />
          Vue Task Manager
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { CheckCircle } from 'lucide-vue-next'
</script>
