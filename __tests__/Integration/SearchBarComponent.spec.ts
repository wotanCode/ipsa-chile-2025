import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SearchBarComponent from "../SearchBarComponent.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(SearchBarComponent, {
      props: { msg: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
