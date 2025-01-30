import { describe, it, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBarComponent from "./SearchBarComponent.vue"; // Asegúrate de que el path es correcto

// Mock del store
vi.mock("@/stores/chartStore");

describe("SearchBarComponent", () => {
  let storeMock;

  beforeEach(() => {
    storeMock = {
      tabOptions: [{ key: "ABC" }],
      selectTab: vi.fn(),
    };
  });

  it("calls selectTab when option exists", async () => {
    const wrapper = mount(SearchBarComponent);
    const input = wrapper.find("input");

    await input.setValue("ABC");

    // Simular el "enter" o el submit
    await wrapper.find("input").trigger("submit");
  });
});
