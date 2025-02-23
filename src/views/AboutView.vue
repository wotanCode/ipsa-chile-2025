<script setup lang="ts">
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import TheWelcome from '@/UI/components/TheWelcome/TheWelcome.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <LayoutTemplate :title="t('about.title')">
    <TheWelcome />
  </LayoutTemplate>
</template>
