import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { ResumenI } from "@/interfaces/resumen";
import { useChartStore } from "@/stores/chartStore";

export const useResumeStore = defineStore("resume", () => {
  const chartStore = useChartStore();
  const selectedInstrument = ref(chartStore.selectedKey);
  const resumenData = ref<ResumenI | null>(null);

  const instrumentMapping: Record<string, string> = {
    AGUASA: "AGUAS-A",
    ANDINAB: "ANDINA-B",
    BCI: "BCI",
    BSANTANDER: "BSANTANDER",
    CAP: "CAP",
    IPSA: "IPSA",
  };

  async function fetchResumen(instrument: string) {
    const mappedInstrument = instrumentMapping[instrument];

    if (!mappedInstrument) {
      console.error(`Instrumento ${instrument} no mapeado.`);
      resumenData.value = null;
      return;
    }

    try {
      // Usar la ruta relativa a la carpeta public
      const response = await fetch(`/db/resumen/${mappedInstrument}.json`);
      if (!response.ok) throw new Error("Error al cargar el resumen");
      resumenData.value = (await response.json()) as ResumenI;
    } catch (error) {
      console.error(error);
      resumenData.value = null;
    }
  }

  watch(
    () => chartStore.selectedKey,
    (newInstrument) => {
      selectedInstrument.value = newInstrument;
      fetchResumen(newInstrument);
    },
    { immediate: true }
  );

  const marketInfo = computed(() => resumenData.value?.data.info ?? null);
  const priceInfo = computed(() => resumenData.value?.data.price ?? null);

  return {
    resumenData,
    marketInfo,
    priceInfo,
    fetchResumen,
  };
});
