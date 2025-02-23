import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'

import { HomeIcon, UserIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import NavButton from '@/UI/components/NavButton/NavButton.vue'

import NavBar from './NavBar.vue'
const messages = {
  es: {
    navbar: {
      welcome: 'Bienvenido',
      sellers: 'Vendedores',
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

    expect(menuItems.length).toBe(3)
    expect(menuItems[0].props().text).toBe('Bienvenido')
    expect(menuItems[1].props().text).toBe('Vendedores')
    expect(menuItems[2].props().text).toBe('Acerca de')
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
    expect(menuItems[2].props().icon).toBe(InformationCircleIcon)
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
