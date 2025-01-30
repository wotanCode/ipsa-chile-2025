import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import type { HistoryI } from "@/interfaces/history";

type ChartDataT = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

export const useChartStore = defineStore("data", () => {
  const jsonData = ref<Record<string, ChartDataT>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const selectedKey = ref("IPSA");
  const selectedTimeframe = ref("1M");

  const tabOptions = ref<{ key: string; name: string; country: string }[]>([]);

  const instrumentMapping: Record<string, string> = {
    AGUASA: "AGUAS-A",
    ANDINAB: "ANDINA-B",
    BCI: "BCI",
    BSANTANDER: "BSANTANDER",
    CAP: "CAP",
    IPSA: "IPSA",
  };

  const loadData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const datasets: Record<string, ChartDataT> = {};

      const keys = ["AGUASA", "ANDINAB", "BCI", "BSANTANDER", "CAP", "IPSA"];

      const loadJson = async (key: string) => {
        const mappedKey = instrumentMapping[key] || key;
        const response = await fetch(`/db/history/history-${mappedKey}.json`);

        if (!response.ok) {
          console.error(`Failed to load ${mappedKey}`);
          return;
        }

        try {
          const data: HistoryI = await response.json();

          datasets[key] = {
            labels: data.data.chart.map((item) => item.datetimeLastPrice),
            datasets: [
              {
                label: `${data.data.info.name} - Precios de cierre`,
                data: data.data.chart.map((item) => item.closePrice),
                borderColor: "rgba(4, 92, 169, 0)",
                backgroundColor: "rgba(0, 136, 255, 0.5)",
              },
            ],
          };

          // Evitar agregar datos duplicados a tabOptions
          const isTabExist = tabOptions.value.some((tab) => tab.key === key);
          if (!isTabExist) {
            tabOptions.value.push({
              key,
              name: data.data.info.name,
              country: data.data.info.countryName,
            });
          }

          console.log("tabOptions", tabOptions.value);
        } catch (err) {
          console.error(`Error parsing JSON for ${mappedKey}:`, err);
          error.value = `Error al cargar el archivo ${mappedKey}`;
        }
      };

      await Promise.all(keys.map((key) => loadJson(key)));

      jsonData.value = datasets;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  };

  const selectTab = (key: string) => {
    selectedKey.value = key;
  };

  const setTimeframe = (timeframe: string) => {
    selectedTimeframe.value = timeframe;
  };

  onMounted(() => {
    loadData();
  });

  return {
    jsonData,
    isLoading,
    error,
    selectedKey,
    selectedTimeframe,
    tabOptions,
    loadData,
    selectTab,
    setTimeframe,
  };
});
