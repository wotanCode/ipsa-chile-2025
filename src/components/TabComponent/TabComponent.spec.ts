import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TabComponent from "./TabComponent.vue";
import { createPinia, setActivePinia } from "pinia";
import { useChartStore } from "@/stores/chartStore";
import { nextTick } from "vue";

describe("TabComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Activa un nuevo store de Pinia antes de cada test
  });

  it("renders properly", () => {
    const wrapper = mount(TabComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct number of tabs", async () => {
    const store = useChartStore();
    store.tabOptions = [
      { key: "Tab1", name: "Empresa 1", country: "Chile" },
      { key: "Tab2", name: "Empresa 2", country: "Chile" },
      { key: "Tab3", name: "Empresa 3", country: "Chile" },
    ];

    const wrapper = mount(TabComponent);
    await nextTick();

    const tabs = wrapper.findAll(".tab");

    expect(tabs.length).toBe(3);
  });

  it("activates the correct tab on click", async () => {
    const store = useChartStore();
    store.tabOptions = [
      { key: "Tab1", name: "Empresa 1", country: "Chile" },
      { key: "Tab2", name: "Empresa 2", country: "Chile" },
      { key: "Tab3", name: "Empresa 3", country: "Chile" },
    ];
    store.selectedKey = "Tab1";

    const wrapper = mount(TabComponent);
    await nextTick();

    const tabs = wrapper.findAll(".tab");

    expect(tabs.length).toBe(3)

    // Verifica si el segundo tab está disponible
    if (tabs[1]) {

      await tabs[1].trigger("click");
      expect(store.selectedKey).toBe("Tab2");
    }
  });
});
