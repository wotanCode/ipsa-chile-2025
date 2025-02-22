<script setup lang="ts">
import NavBar from '@/UI/modules/NavBar/NavBar.vue'
</script>
<template>
  <div class="lg:flex">
    <header
      class="p-6 shadow-lg rounded-lg mb-6 lg:mb-0 lg:mr-4 lg:w-64 lg:flex-shrink-0 lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden"
    >
      <img
        alt="Alegra logo"
        class="mb-6 hidden dark:block"
        src="@/assets/logo-alegra-white.svg"
        width="125"
        height="125"
      />

      <img
        alt="Alegra logo"
        class="mb-6 dark:hidden"
        src="@/assets/logo-alegra-black.svg"
        width="125"
        height="125"
      />

      <NavBar />
    </header>

    <main class="p-4 lg:max-h-screen lg:overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
