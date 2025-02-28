import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import AlertBox from './AlertBox.vue'

describe('AlertMessage.vue', () => {
  test('renders correctly with alert type', () => {
    const wrapper = mount(AlertBox, {
      props: {
        type: 'alert',
        message: 'This is an alert message',
      },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toContain('bg-yellow-50')
    expect(div.classes()).toContain('border-yellow-400')
    expect(div.classes()).toContain('text-yellow-700')

    const message = wrapper.find('p')
    expect(message.text()).toBe('This is an alert message')
  })

  test('renders correctly with error type', () => {
    const wrapper = mount(AlertBox, {
      props: {
        type: 'error',
        message: 'This is an error message',
      },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toContain('bg-red-50')
    expect(div.classes()).toContain('border-red-400')
    expect(div.classes()).toContain('text-red-700')

    const message = wrapper.find('p')
    expect(message.text()).toBe('This is an error message')
  })

  test('renders correctly with success type', () => {
    const wrapper = mount(AlertBox, {
      props: {
        type: 'success',
        message: 'This is a success message',
      },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toContain('bg-green-50')
    expect(div.classes()).toContain('border-green-400')
    expect(div.classes()).toContain('text-green-700')

    const message = wrapper.find('p')
    expect(message.text()).toBe('This is a success message')
  })

  test('does not render when message is empty', () => {
    const wrapper = mount(AlertBox, {
      props: {
        type: 'alert',
        message: '',
      },
    })

    const div = wrapper.find('div')
    expect(div.exists()).toBe(false)
  })
})
