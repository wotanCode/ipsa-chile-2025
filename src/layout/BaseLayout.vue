<script setup lang="ts">
import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
import ChartComponent from "@/components/ChartComponent/ChartComponent.vue";
import TabComponent from "@/components/TabComponent/TabComponent.vue";
import SummaryComponent from "@/components/SummaryComponent/SummaryComponent.vue";
import InstrumentListComponent from "@/components/InstrumentListComponent/InstrumentListComponent.vue";
</script>

<template>
  <div class="layoutContainer">
    <header class="headerContainer">
      <SearchBarComponent />
    </header>

    <main class="mainContainer">
      <div class="primaryContainer">
        <div class="chartContainer">
          <HeaderComponent />

          <ChartComponent />
        </div>

        <div class="infoContainer">
          <SummaryComponent />
        </div>
      </div>

      <div class="thirdContainer">
        <TabComponent />
      </div>

      <div>
        <InstrumentListComponent />
      </div>
    </main>

    <footer class="footer">
      <p>
        * Último precio, monto transado y variación diaria con desfase de 15
        minutos. Haz clic en cada instrumento para ver la información
        actualizada en el gráfico.
      </p>
      <p>
        ** Variaciones a 30D. Año actual y 12 meses calculadas con el precio de
        cierre al último día hábil.
      </p>

      <p>
        Hecho con ❤️ por Pedro Yanez, revisa mi
        <a
          href="https://www.linkedin.com/in/pedro-yanez/"
          target="_blank"
          rel="noreferrer"
          >LinkedIn</a
        >
        y mi
        <a href="https://github.com/wotanCode" target="_blank" rel="noreferrer"
          >GitHub</a
        >
        aquí
      </p>
    </footer>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.layoutContainer {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  gap: 2rem;

  .mainContainer {
    display: flex;
    flex-direction: column;
  }

  .primaryContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;

    .chartContainer {
      width: 70%;
    }

    .infoContainer {
      width: 25%;
    }
  }
}

.thirdContainer {
  margin-top: 2rem;
}

.footer {
  font-size: 10px;
}
</style>
