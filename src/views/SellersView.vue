<script setup lang="ts">
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import SellersSection from '@/UI/modules/SellersSection/SellersSection.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <LayoutTemplate :title="t('sellers.title')">
    <SellersSection />
  </LayoutTemplate>
</template>
