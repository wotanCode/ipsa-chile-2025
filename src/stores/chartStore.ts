import { defineStore } from "pinia";
import { ref } from "vue";
import type { HistoryI } from "@/interfaces/history";

import AGUASA from "@/db/history/history-AGUAS-A.json";
import ANDINAB from "@/db/history/history-ANDINA-B.json";
import BCI from "@/db/history/history-BCI.json";
import BSANTANDER from "@/db/history/history-BSANTANDER.json";
import CAP from "@/db/history/history-CAP.json";
import IPSA from "@/db/history/history-IPSA.json";

type ChartDataT = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const historyData: Record<string, HistoryI> = {
  AGUASA,
  ANDINAB,
  BCI,
  BSANTANDER,
  CAP,
  IPSA,
};

export const useChartStore = defineStore("data", () => {
  const jsonData = ref<Record<string, ChartDataT>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const selectedKey = ref("IPSA");
  const selectedTimeframe = ref("1M");

  const tabOptions = ref<{ key: string; name: string; country: string }[]>(
    Object.entries(historyData).map(([key, data]) => ({
      key,
      name: data.data.info.name,
      country: data.data.info.countryName,
    }))
  );

  function loadData() {
    isLoading.value = true;
    error.value = null;

    try {
      const datasets: Record<string, ChartDataT> = {};

      for (const [key, data] of Object.entries(historyData)) {
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
      }

      jsonData.value = datasets;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  function selectTab(key: string) {
    selectedKey.value = key;
  }

  function setTimeframe(timeframe: string) {
    selectedTimeframe.value = timeframe;
  }

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
