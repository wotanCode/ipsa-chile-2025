<script setup lang="ts">
import { ref } from "vue";
import { useChartStore } from "@/stores/chartStore";

const store = useChartStore();
const searchQuery = ref("");

const onSubmit = (event: Event) => {
  event.preventDefault();

  const key = searchQuery.value.toUpperCase();

  if (!store.tabOptions) {
    console.error("tabOptions no está definido", store.tabOptions);
    return;
  }

  const option = store.tabOptions.find((option) => option.key === key);

  if (option) {
    store.selectTab(key);
    searchQuery.value = "";
  } else {
    alert(`No se encontró la opción con key: ${key}`);
    console.warn(`No se encontró la opción con key: ${key}`);
    searchQuery.value = "";
  }
};
</script>

<template>
  <form class="uk-inline formContainer" @submit="onSubmit">
    <vk-icon
      icon="search"
      name="search"
      class="uk-position-center-left uk-margin-small-left uk-icon-medium"
      style="z-index: 1"
    />
    <input
      v-model="searchQuery"
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
