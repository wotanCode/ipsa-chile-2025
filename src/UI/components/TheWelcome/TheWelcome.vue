<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <h1 class="text-4xl">{{ t('home.title') }}</h1>
  <p>{{ t('home.primaryParagraph') }}</p>

  <p>wip</p>
</template>
