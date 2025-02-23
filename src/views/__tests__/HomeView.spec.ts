import { describe, test, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import HomeView from '../HomeView.vue'
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import TheWelcome from '@/UI/components/TheWelcome/TheWelcome.vue'

const messages = {
  es: {
    home: {
      title: 'Bienvenido a la página de inicio',
      primaryParagraph: 'Este es el párrafo principal de la página de inicio.',
      introText: 'Aquí tienes una introducción al sitio.',
      howItWorks: 'Así funciona el sitio.',
      pointsList: {
        challenge: 'Desafío',
        points: 'Puntos',
        prize: 'Premio',
      },
      raceConclusion: 'Conclusión de la carrera',
    },
  },
}

const i18n = createI18n({
  locale: 'es',
  messages,
})

describe('TheWelcomeView.vue', () => {
  test('renders correctly with the title and components', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n],
        components: {
          LayoutTemplate,
          TheWelcome,
        },
      },
    })

    await flushPromises()

    const layout = wrapper.findComponent(LayoutTemplate)
    expect(layout.exists()).toBe(true)

    const welcomeComponent = wrapper.findComponent(TheWelcome)
    expect(welcomeComponent.exists()).toBe(true)

    const title = wrapper.find('h1')
    expect(title.text()).toBe(messages.es.home.title)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
