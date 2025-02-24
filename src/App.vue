<script setup lang="ts">
import NavBar from '@/UI/modules/NavBar/NavBar.vue'

import alegraLogoBlack from '@/assets/logo-alegra-black.svg'
import alegraLogoWhite from '@/assets/logo-alegra-white.svg'
</script>

<template>
  <div class="lg:flex">
    <header
      class="p-6 shadow-lg rounded-lg mb-6 lg:mb-0 lg:mr-4 lg:w-64 lg:flex-shrink-0 lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden flex flex-col bg-[rgb(36,46,52)] dark:bg-neutral-50 self-start"
    >
      <img
        alt="Alegra logo"
        class="mb-6 dark:hidden mx-auto"
        :src="alegraLogoWhite"
        width="125"
        height="125"
      />
      <img
        alt="Alegra logo"
        class="mb-6 hidden dark:block mx-auto"
        :src="alegraLogoBlack"
        width="125"
        height="125"
      />

      <NavBar />
    </header>

    <div class="p-4 lg:max-h-screen flex-1">
      <RouterView />
    </div>
  </div>
</template>
