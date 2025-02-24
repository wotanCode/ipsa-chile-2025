<script setup lang="ts">
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import ImageRaceSection from '@/UI/modules/ImageRaceSection/ImageRaceSection.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <LayoutTemplate :title="t('imageRace.title')">
    <ImageRaceSection />
  </LayoutTemplate>
</template>
