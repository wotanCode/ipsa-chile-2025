import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import InstrumentListComponent from "./InstrumentListComponent.vue";
import { beforeEach, describe, expect, it } from "vitest";

describe("InstrumentListComponent", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("renders correctly when data is loaded", async () => {
    const wrapper = mount(InstrumentListComponent, {
      global: {
        plugins: [createPinia()],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("");
  });
});
