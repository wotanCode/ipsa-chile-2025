import { mount } from '@vue/test-utils'
import Layout from './LayoutTemplate.vue'
import { describe, expect, test } from 'vitest'

describe('Layout.vue', () => {
  test('renders the title prop correctly', () => {
    const title = 'Page Title'
    const wrapper = mount(Layout, {
      props: { title },
    })

    expect(wrapper.text()).toContain(title)
  })

  test('renders the slot content correctly', () => {
    const slotContent = 'This is the slot content.'
    const wrapper = mount(Layout, {
      props: { title: 'Page Title' },
      slots: {
        default: slotContent,
      },
    })

    expect(wrapper.text()).toContain(slotContent)
  })
})
