<script setup lang="ts">
import { HomeIcon, UserIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import NavButton from '@/UI/components/NavButton/NavButton.vue'
import { IDS } from '@/const/ids'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const menuItems = [
  { id: IDS.navBar.home, text: t('navbar.welcome'), url: '/', icon: HomeIcon },
  { id: IDS.navBar.seller, text: t('navbar.sellers'), url: '/vendedores', icon: UserIcon },
  { id: IDS.navBar.about, text: t('navbar.about'), url: '/acerca-de', icon: InformationCircleIcon },
]
</script>

<template>
  <nav class="w-full">
    <ul class="flex text-lg text-center lg:flex-col lg:space-y-4">
      <template v-for="(item, index) in menuItems" :key="item.id">
        <NavButton v-bind="item" class="lg:w-full" />
        <li v-if="index < menuItems.length - 1" class="flex items-center lg:hidden">
          <span class="mx-2 text-gray-400">|</span>
        </li>
      </template>
    </ul>
  </nav>
</template>
