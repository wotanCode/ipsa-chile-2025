<script setup lang="ts">
//TODO: Actualizar los props necesarios
// defineProps<{
//   msg: string
// }>()
</script>

<template>
  <div class="headerContainer">
    <h2 class="title">IPSA, Chile</h2>

    <p>Indice:</p>
    <hr />

    <div class="valuesContainer">
      <p>Valor actual: arriba 12</p>
      <p>Var. % Actual -0.12%</p>
      <p>Var. Puntos Actual: -23,23</p>
    </div>

    <hr />
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
.headerContainer {
  display: flex;
  flex-direction: column;
}

.valuesContainer {
  display: flex;
}

.title {
  color: var(--vt-c-white-mute);
}
</style>
