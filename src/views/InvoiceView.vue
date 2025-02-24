<script setup lang="ts">
import LayoutTemplate from '@/UI/layout/LayoutTemplate.vue'
import InvoiceSection from '@/UI/modules/InvoiceSection/InvoiceSection.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <LayoutTemplate :title="t('invoice.title')">
    <InvoiceSection />
  </LayoutTemplate>
</template>
