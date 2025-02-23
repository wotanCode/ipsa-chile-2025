import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { markRaw } from 'vue'
import NavButton from '@/UI/components/NavButton/NavButton.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: 'Home' } }],
})

const DummyIcon = markRaw({
  template: '<div />',
})

describe('NavButton.vue component', () => {
  test('renders correctly with props', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(NavButton, {
      global: {
        plugins: [router],
      },
      props: {
        text: 'Go to Home',
        icon: DummyIcon,
        id: 'button-home',
        url: '/',
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/')
    expect(link.text()).toBe('Go to Home')
    expect(wrapper.findComponent(DummyIcon).exists()).toBe(true)
  })

  test('navigates to the correct URL when clicked', async () => {
    router.push('/other')
    await router.isReady()

    const wrapper = mount(NavButton, {
      global: {
        plugins: [router],
      },
      props: {
        text: 'Go to Home',
        icon: DummyIcon,
        id: 'button-home',
        url: '/',
      },
    })

    await wrapper.find('a').trigger('click')
    expect(router.currentRoute.value.path).toBe('/')
  })
})
