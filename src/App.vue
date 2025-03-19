<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main class="container mx-auto p-4 py-8">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/CustomHeader.vue'
import Footer from './components/CustomFooter.vue'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
