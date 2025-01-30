import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SummaryComponent from "./SummaryComponent.vue";
import { useResumeStore } from "@/stores/resumeStore";

vi.mock("@/stores/resumeStore");

describe("SummaryComponent", () => {
  it("should mount successfully", async () => {
    const storeMock = {
      marketInfo: { marketName: "Santiago Stock Exchange" },
      priceInfo: { closePrice: 102.5 },
    };
    useResumeStore.mockReturnValue(storeMock);

    const wrapper = mount(SummaryComponent);
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });
});
