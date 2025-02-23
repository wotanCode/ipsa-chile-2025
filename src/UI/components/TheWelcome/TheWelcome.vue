<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <p class="border-b-2 border-gray-300/50 pb-2 italic text-gray-700/60 dark:text-gray-300/80">
    {{ t('home.primaryParagraph') }}
  </p>
  <article class="flex flex-col gap-4 mt-4">
    <p>{{ t('home.introText') }}</p>

    <p>
      <strong>{{ t('home.howItWorks') }}</strong>
    </p>
    <ul class="list-disc list-inside">
      <li>{{ t('home.pointsList.challenge') }}</li>
      <li>{{ t('home.pointsList.points') }}</li>
      <li>{{ t('home.pointsList.prize') }}</li>
    </ul>

    <p>{{ t('home.raceConclusion') }}</p>
  </article>
</template>
