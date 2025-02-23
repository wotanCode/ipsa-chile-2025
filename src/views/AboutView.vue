<script setup lang="ts">
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import TheAbout from '@/UI/components/TheAbout/TheAbout.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <LayoutTemplate :title="t('about.title')">
    <TheAbout />
  </LayoutTemplate>
</template>
