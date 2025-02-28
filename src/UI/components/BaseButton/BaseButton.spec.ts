import { markRaw } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import BaseButton from './BaseButton.vue'

describe('Button.vue', () => {
  test('renders correctly with label and icon', () => {
    const DummyIcon = markRaw({
      template: '<div />',
    })

    const wrapper = mount(BaseButton, {
      props: {
        label: 'Click Me',
        icon: DummyIcon,
      },
    })

    const button = wrapper.find('button')
    expect(button.text()).toBe('Click Me')

    const icon = wrapper.findComponent(DummyIcon)
    expect(icon.exists()).toBe(true)
  })

  test('renders correctly with label only', () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: 'Click Me',
      },
    })

    const button = wrapper.find('button')
    expect(button.text()).toBe('Click Me')

    const icon = wrapper.findComponent('svg')
    expect(icon.exists()).toBe(false)
  })

  test('handles click event correctly', async () => {
    const onClick = vi.fn()

    const wrapper = mount(BaseButton, {
      props: {
        label: 'Click Me',
        onClick,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  test('does not call onClick when disabled', async () => {
    const onClick = vi.fn()

    const wrapper = mount(BaseButton, {
      props: {
        label: 'Click Me',
        onClick,
        disabled: true,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  test('applies disabled class when disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: 'Click Me',
        disabled: true,
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('disabled:opacity-70')
    expect(button.classes()).toContain('disabled:cursor-not-allowed')
    expect(button.attributes('disabled')).toBeDefined()
  })
})
