<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-2xl font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              ></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            Vue Task Manager
          </router-link>
          <nav class="flex gap-4">
            <router-link
              to="/"
              class="px-3 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              active-class="bg-emerald-700"
              >Home</router-link
            >
            <router-link
              to="/about"
              class="px-3 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              active-class="bg-emerald-700"
              >About</router-link
            >
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-gray-500/20 text-gray-500 py-6">
      <div class="container mx-auto px-4 text-center">
        <p>Vue Task Manager - Created for Vue.js Introduction Workshop</p>
        <p class="text-sm text-gray-400 mt-2">
          Built with Vue 3, Composition API, and Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup></script>

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
