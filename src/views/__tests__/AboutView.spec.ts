import { describe, test, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import AboutView from '../AboutView.vue'
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import TheAbout from '@/UI/components/TheAbout/TheAbout.vue'

const messages = {
  es: {
    about: {
      title: 'Acerca de nosotros',
      stack_technologies: {
        vuejs: {
          name: 'Vue.js',
          description: 'Un framework progresivo para construir interfaces de usuario',
        },
        typescript: {
          name: 'TypeScript',
          description: 'Un superset de JavaScript con tipos estáticos',
        },
        tailwind: {
          name: 'Tailwind CSS',
          description: 'Un framework de CSS para diseño rápido',
        },
        vitest: {
          name: 'Vitest',
          description: 'Un framework de pruebas para aplicaciones de JavaScript',
        },
        playwright: {
          name: 'Playwright',
          description: 'Herramienta de automatización para pruebas en aplicaciones web',
        },
      },
      about_project_description: 'Este es un proyecto para mostrar cómo configurar Vue.js con i18n',
      technology_stack: 'Pila tecnológica utilizada',
    },
  },
}

const i18n = createI18n({
  locale: 'es',
  messages,
})

describe('AboutView.vue', () => {
  test('renders correctly with the title and components', async () => {
    const wrapper = mount(AboutView, {
      global: {
        plugins: [i18n],
        components: {
          LayoutTemplate,
          TheAbout,
        },
      },
    })

    await flushPromises()

    const layout = wrapper.findComponent(LayoutTemplate)
    expect(layout.exists()).toBe(true)

    const aboutComponent = wrapper.findComponent(TheAbout)
    expect(aboutComponent.exists()).toBe(true)

    const title = wrapper.find('h1')
    expect(title.text()).toBe(messages.es.about.title)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
