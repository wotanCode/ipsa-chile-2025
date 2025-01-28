<script setup lang="ts">
// TODO: Actualizar los props necesarios
// defineProps<{
//   msg: string
// }>()
</script>

<template>
  <form class="uk-inline" style="width: 100%">
    <vk-icon
      icon="search"
      name="search"
      class="uk-position-center-left uk-margin-small-left uk-icon-medium"
      style="z-index: 1"
    />
    <input
      placeholder="Search bar"
      class="uk-input uk-text-dark"
      style="padding-left: 35px; width: 100%"
    />
  </form>
</template>

<style scoped>
.testClass {
  background-color: red;
}
</style>
