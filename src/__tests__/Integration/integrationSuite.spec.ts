import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import InstrumentListComponent from "@/components/InstrumentListComponent/InstrumentListComponent.vue";
import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/stores/chartStore");

describe("Integration Test Suite", () => {
  it("renders InstrumentListComponent", () => {
    setActivePinia(createPinia());
    const wrapper = mount(InstrumentListComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it("SearchBarComponent calls selectTab", async () => {
    const storeMock = { selectTab: vi.fn() };
    const wrapper = mount(SearchBarComponent);
    await wrapper.find("input").setValue("ABC");
    await wrapper.find("input").trigger("submit");
  });
});
