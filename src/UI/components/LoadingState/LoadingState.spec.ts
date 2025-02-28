import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LoadingState from './LoadingState.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

describe('LoadingState', () => {
  it('renderiza correctamente el icono de carga', () => {
    const wrapper = mount(LoadingState)

    const icon = wrapper.findComponent(ArrowPathIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('animate-spin')
  })

  it('muestra el mensaje si se proporciona', () => {
    const message = 'Cargando datos...'
    const wrapper = mount(LoadingState, {
      props: { message },
    })

    const textElement = wrapper.find('p')
    expect(textElement.exists()).toBe(true)
    expect(textElement.text()).toBe(message)
  })

  it('no muestra el mensaje si no se proporciona', () => {
    const wrapper = mount(LoadingState)

    expect(wrapper.find('p').exists()).toBe(false)
  })
})
