<script setup lang="ts">
// TODO: Actualizar los props necesarios
// defineProps<{
//   msg: string
// }>()
</script>

<template>
  <form class="uk-inline formContainer">
    <vk-icon
      icon="search"
      name="search"
      class="uk-position-center-left uk-margin-small-left uk-icon-medium"
      style="z-index: 1"
    />
    <input
      placeholder="Busca un instrumento"
      class="uk-input uk-text-dark uk-background-secondary"
      style="padding-left: 35px; width: 100%"
    />
  </form>
</template>

<style scoped>
.formContainer {
  width: 100%;
}

.uk-input {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  border-radius: 4px;
  border: 1px solid transparent;
}

.uk-input:focus {
  background-color: var(--vt-c-black-mute);
  color: var(--vt-c-white-mute);
  outline: none;
  border-color: var(--vt-c-white-mute);
}
</style>
