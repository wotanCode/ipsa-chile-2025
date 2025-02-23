import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import TheWelcome from './TheWelcome.vue'
import { describe, expect, test } from 'vitest'

const messages = {
  es: {
    home: {
      primaryParagraph: 'Este es el párrafo principal.',
      introText: 'Introducción al proyecto.',
      howItWorks: 'Cómo funciona:',
      pointsList: {
        challenge: 'El desafío',
        points: 'Los puntos',
        prize: 'El premio',
      },
      raceConclusion: 'Conclusión de la carrera.',
    },
  },
}

const i18n = createI18n({
  locale: 'es',
  messages,
})

describe('TheWelcome.vue', () => {
  test('correctly displays the main paragraph and the points list', async () => {
    const wrapper = mount(TheWelcome, {
      global: {
        plugins: [i18n],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain(messages.es.home.primaryParagraph)

    expect(wrapper.text()).toContain(messages.es.home.introText)

    expect(wrapper.text()).toContain(messages.es.home.howItWorks)

    expect(wrapper.text()).toContain(messages.es.home.pointsList.challenge)
    expect(wrapper.text()).toContain(messages.es.home.pointsList.points)
    expect(wrapper.text()).toContain(messages.es.home.pointsList.prize)

    expect(wrapper.text()).toContain(messages.es.home.raceConclusion)
  })
})
