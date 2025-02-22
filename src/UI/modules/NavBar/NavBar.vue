<script setup lang="ts">
import NavButton from '@/UI/components/NavButton/NavButton.vue'
import { IDS } from '@/const/ids'

const menuItems = [
  { id: IDS.navBar.home, text: 'Bienvenido', url: '/' },
  { id: IDS.navBar.seller, text: 'Vendedores', url: '/vendedores' },
  { id: IDS.navBar.about, text: 'Acerca de este proyecto', url: '/about' },
]
</script>

<template>
  <nav class="w-full">
    <ul class="flex space-x-6 text-lg text-center lg:flex-col lg:space-x-0 lg:space-y-4">
      <NavButton v-for="item in menuItems" :key="item.id" v-bind="item" />
    </ul>
  </nav>
</template>
