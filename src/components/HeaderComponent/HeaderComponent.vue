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

    <ul class="valuesContainer">
      <li class="valueItem">
        Valor actual:
        <span class="presentValue">
          <!-- ↑ -->
          ↓ 63.451,4
        </span>
      </li>
      <li class="valueItem">
        Var. % Actual <span class="uk-text-danger">-0.12%</span>
      </li>
      <li class="valueItem">
        Var. Puntos Actual: <span class="uk-text-danger">-23,23</span>
      </li>
    </ul>

    <hr />
  </div>
</template>

<style scoped>
p,
ul {
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
}

.headerContainer {
  display: flex;
  flex-direction: column;

  .title {
    color: var(--vt-c-white);
  }

  .valuesContainer {
    display: flex;
  }

  .valueItem {
    padding: 0 1rem 0 1rem;
  }

  .valueItem:first-child {
    padding-left: 0;
  }

  .valueItem:last-child {
    padding-right: 0;
  }

  .presentValue {
    color: var(--vt-c-white-mute);
  }

  .statusRed {
    color: rgba(255, 0, 0, 0.798);
  }
}
</style>
