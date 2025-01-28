<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SearchBarComponent from './components/SearchBarComponent.vue'
</script>

<template>
  <!-- Sistema de navegación entre paginas No operativo-->
  <!-- <header> 
       <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> 
  </header> -->
  <RouterView />
</template>

<style scoped></style>
