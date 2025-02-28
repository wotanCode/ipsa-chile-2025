<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { routes } from '@/router'

import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  FlagIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'

import NavButton from '@/UI/components/NavButton/NavButton.vue'

import { IDS } from '@/const/ids'

const { t } = useI18n()

const menuItems = [
  { id: IDS.navBar.home, text: t('navbar.welcome'), url: routes.home, icon: HomeIcon },
  { id: IDS.navBar.seller, text: t('navbar.sellers'), url: routes.sellers, icon: UserIcon },
  {
    id: IDS.navBar.imageRace,
    text: t('navbar.imageRace'),
    url: routes.imageRace,
    icon: FlagIcon,
  },
  {
    id: IDS.navBar.invoice,
    text: t('navbar.invoice'),
    url: routes.invoice,
    icon: DocumentTextIcon,
  },
  { id: IDS.navBar.about, text: t('navbar.about'), url: routes.about, icon: InformationCircleIcon },
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
