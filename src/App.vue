<script setup lang="ts">
import { computed } from 'vue'
import { useDark } from '@vueuse/core'

import NavBar from '@/UI/modules/NavBar/NavBar.vue'

import alegraLogoBlack from '@/assets/logo-alegra-black.svg'
import alegraLogoWhite from '@/assets/logo-alegra-white.svg'

const isDark = useDark({ selector: 'html', attribute: 'class' })

const logo = computed(() => (isDark.value ? alegraLogoWhite : alegraLogoBlack))
</script>

<template>
  <div class="lg:flex">
    <header
      class="p-6 shadow-lg rounded-lg mb-6 lg:mb-0 lg:mr-4 lg:w-64 lg:flex-shrink-0 lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden flex flex-col"
    >
      <img alt="Alegra logo" class="mb-6" :src="logo" width="125" height="125" />

      <NavBar />
    </header>

    <main class="p-4 lg:max-h-screen lg:overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
