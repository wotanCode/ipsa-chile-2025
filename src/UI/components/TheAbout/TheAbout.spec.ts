import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import TheAbout from './TheAbout.vue'
import { describe, expect, test } from 'vitest'

const messages = {
  es: {
    about: {
      about_project_description: 'Este proyecto usa varias tecnologías.',
      technology_stack: 'Pila tecnológica',
      stack_technologies: {
        vuejs: {
          name: 'Vue.js',
          description: 'Un marco progresivo para construir interfaces de usuario.',
        },
        typescript: {
          name: 'Typescript',
          description: 'Un lenguaje fuertemente tipado que extiende JavaScript.',
        },
        tailwind: {
          name: 'Tailwind',
          description: 'Un marco CSS para diseñar interfaces rápidamente.',
        },
        vitest: {
          name: 'Vitest',
          description: 'Un marco de pruebas rápido para proyectos de Vue.',
        },
        playwright: {
          name: 'Playwright',
          description: 'Una herramienta de pruebas para aplicaciones web modernas.',
        },
      },
    },
  },
}

const i18n = createI18n({
  locale: 'es',
  messages,
})

describe('TheAbout.vue component', () => {
  test('displays project description and title correctly', async () => {
    const wrapper = mount(TheAbout, { global: { plugins: [i18n] } })
    await flushPromises()
    expect(wrapper.text()).toContain(messages.es.about.about_project_description)
    expect(wrapper.text()).toContain(messages.es.about.technology_stack)
  })

  test('displays technologies correctly', async () => {
    const wrapper = mount(TheAbout, { global: { plugins: [i18n] } })
    await flushPromises()
    const techItems = wrapper.findAll('li')
    expect(techItems[0].find('img').attributes('alt')).toBe(
      messages.es.about.stack_technologies.vuejs.name,
    )
    expect(techItems[0].find('p').text()).toBe(
      messages.es.about.stack_technologies.vuejs.description,
    )
    expect(techItems[1].find('img').attributes('alt')).toBe(
      messages.es.about.stack_technologies.typescript.name,
    )
    expect(techItems[1].find('p').text()).toBe(
      messages.es.about.stack_technologies.typescript.description,
    )
    expect(techItems[2].find('img').attributes('alt')).toBe(
      messages.es.about.stack_technologies.tailwind.name,
    )
    expect(techItems[2].find('p').text()).toBe(
      messages.es.about.stack_technologies.tailwind.description,
    )
    expect(techItems[3].find('img').attributes('alt')).toBe(
      messages.es.about.stack_technologies.vitest.name,
    )
    expect(techItems[3].find('p').text()).toBe(
      messages.es.about.stack_technologies.vitest.description,
    )
    expect(techItems[4].find('img').attributes('alt')).toBe(
      messages.es.about.stack_technologies.playwright.name,
    )
    expect(techItems[4].find('p').text()).toBe(
      messages.es.about.stack_technologies.playwright.description,
    )
  })

  test('contains two hr elements with the correct class', async () => {
    const wrapper = mount(TheAbout, { global: { plugins: [i18n] } })
    await flushPromises()
    const hrs = wrapper.findAll('hr')
    expect(hrs.length).toBe(2)
    hrs.forEach((hr) => {
      expect(hr.classes()).toContain('border-white/50')
    })
  })

  test('GitHub link and footer content are correct', async () => {
    const wrapper = mount(TheAbout, { global: { plugins: [i18n] } })
    await flushPromises()
    const githubLink = wrapper.find('div.flex.items-center.gap-2.mt-4 a')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('href')).toBe('https://github.com/wotanCode')
    expect(githubLink.attributes('target')).toBe('_blank')
    const svg = githubLink.find('svg')
    expect(svg.exists()).toBe(true)
    const footerText = wrapper.find('div.flex.items-center.gap-2.mt-4 span').text()
    expect(footerText).toContain('Pedro Yanez @2025')
  })
})
