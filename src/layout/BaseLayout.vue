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
  </div>
</template>

<style scoped>
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
</style>
