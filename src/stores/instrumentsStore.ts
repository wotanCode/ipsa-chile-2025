import { defineStore } from "pinia";
import { ref } from "vue";
import type { ConstituensListI } from "@/interfaces/constituensList";
import dataJson from "@/db/constituyentes/constituensList.json"; // Ajusta la ruta según sea necesario

export const useInstrumentStore = defineStore("instrumentStore", () => {
  const instrumentsData = ref<ConstituensListI | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  function loadInstruments() {
    isLoading.value = true;
    error.value = null;
    try {
      instrumentsData.value = dataJson;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    instrumentsData,
    isLoading,
    error,
    loadInstruments,
  };
});
