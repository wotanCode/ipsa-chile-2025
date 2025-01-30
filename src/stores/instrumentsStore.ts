import { defineStore } from "pinia";
import { ref } from "vue";
import type { ConstituensListI } from "@/interfaces/constituensList";

export const useInstrumentStore = defineStore("instrumentStore", () => {
  const instrumentsData = ref<ConstituensListI | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Cargar datos de los constituyentes desde la carpeta public
  async function loadInstruments() {
    isLoading.value = true;
    error.value = null;

    try {
      // Verificar si estamos en local o en producción
      const isLocal = window.location.hostname === "localhost";
      const baseUrl = isLocal ? "/db/constituyentes" : "/db/constituyentes";

      const response = await fetch(`${baseUrl}/constituensList.json`);

      if (!response.ok) {
        throw new Error("Error al cargar los datos de los instrumentos.");
      }

      instrumentsData.value = await response.json();
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
