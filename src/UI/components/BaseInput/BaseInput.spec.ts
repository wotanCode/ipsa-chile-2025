import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import BaseInput from './BaseInput.vue'

describe('Input.vue', () => {
  test('renders with placeholder', () => {
    const wrapper = mount(BaseInput, {
      props: {
        placeholder: 'Enter text',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter text')
  })

  test('updates modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'initial value',
        placeholder: 'Enter text',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['new value'])
  })

  test('does not emit update:modelValue when disabled', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'initial value',
        disabled: true,
        placeholder: 'Enter text',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted()['update:modelValue']).toBeUndefined()
  })

  test('applies disabled class and disables input when disabled is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        disabled: true,
        placeholder: 'Enter text',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.classes()).toContain('disabled:opacity-70')
    expect(input.classes()).toContain('disabled:cursor-not-allowed')
  })

  test('reacts to external modelValue changes', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'initial value',
        placeholder: 'Enter text',
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial value')

    await wrapper.setProps({ modelValue: 'updated value' })
    expect(input.element.value).toBe('updated value')
  })
})
