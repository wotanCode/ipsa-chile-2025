import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'

import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  FlagIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'
import NavButton from '@/UI/components/NavButton/NavButton.vue'

import NavBar from './NavBar.vue'
const messages = {
  es: {
    navbar: {
      welcome: 'Bienvenido',
      sellers: 'Vendedores',
      imageRace: 'Carerra de imágenes',
      invoice: 'Factura',
      about: 'Acerca de',
    },
  },
}

const i18n = createI18n({
  locale: 'es',
  messages,
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: {} },
    { path: '/vendedores', component: {} },
    { path: '/carrera-imagenes', component: {} },
    { path: '/factura', component: {} },
    { path: '/acerca-de', component: {} },
  ],
})

describe('Navbar.vue', () => {
  test('renders menu items correctly', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [i18n, router],
      },
    })

    const menuItems = wrapper.findAllComponents(NavButton)

    expect(menuItems.length).toBe(5)
    expect(menuItems[0].props().text).toBe('Bienvenido')
    expect(menuItems[1].props().text).toBe('Vendedores')
    expect(menuItems[2].props().text).toBe('Carerra de imágenes')
    expect(menuItems[3].props().text).toBe('Factura')
    expect(menuItems[4].props().text).toBe('Acerca de')
  })

  test('renders correct icons for each menu item', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [i18n, router],
      },
    })

    const menuItems = wrapper.findAllComponents(NavButton)

    expect(menuItems[0].props().icon).toBe(HomeIcon)
    expect(menuItems[1].props().icon).toBe(UserIcon)
    expect(menuItems[2].props().icon).toBe(FlagIcon)
    expect(menuItems[3].props().icon).toBe(DocumentTextIcon)
    expect(menuItems[4].props().icon).toBe(InformationCircleIcon)
  })

  test('renders navigation buttons with correct classes', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [i18n, router],
      },
    })

    const navButtons = wrapper.findAllComponents(NavButton)

    navButtons.forEach((button) => {
      expect(button.classes()).toContain('lg:w-full')
    })
  })
})
