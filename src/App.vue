<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main class="container mx-auto p-4 py-8">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/CustomHeader.vue'
import Footer from './components/CustomFooter.vue'
</script>
