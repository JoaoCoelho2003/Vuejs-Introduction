<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">About This App</h1>

      <div class="prose max-w-none">
        <p>
          This Task Manager app was created as a demonstration for a Vue.js introduction workshop.
          It showcases various Vue.js features and concepts:
        </p>

        <h2>Vue.js Features Demonstrated</h2>

        <ul>
          <li>
            <strong>Composition API with <code>&lt;script setup&gt;</code></strong> - Modern Vue 3
            syntax for better organization and type inference
          </li>
          <li>
            <strong>Component Communication</strong> - Using props and emits to pass data between
            components
          </li>
          <li>
            <strong>Directives</strong> - <code>v-for</code>, <code>v-if</code>,
            <code>v-else</code>, <code>v-model</code>, <code>v-bind</code>, etc.
          </li>
          <li>
            <strong>Reactivity System</strong> - Using <code>ref</code>, <code>computed</code>, and
            <code>watch</code> for reactive state
          </li>
          <li>
            <strong>Vue Router</strong> - Client-side routing with navigation and route parameters
          </li>
          <li>
            <strong>Transitions</strong> - Animated transitions between components and list items
          </li>
          <li>
            <strong>Lifecycle Hooks</strong> - Using <code>onMounted</code> and other lifecycle
            hooks
          </li>
        </ul>

        <h2>Technologies Used</h2>

        <ul>
          <li>
            <strong>Vue 3</strong> - Progressive JavaScript framework for building user interfaces
          </li>
          <li>
            <strong>Tailwind CSS</strong> - Utility-first CSS framework for rapid UI development
          </li>
          <li><strong>Vue Router</strong> - Official router for Vue.js</li>
          <li><strong>Local Storage</strong> - For persisting tasks between sessions</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.prose h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.prose code {
  font-family: monospace;
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
</style>
