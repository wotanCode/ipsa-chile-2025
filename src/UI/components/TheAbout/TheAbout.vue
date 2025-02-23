<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stackTechnologies = [
  {
    name: t('about.stack_technologies.vuejs.name'),
    link: 'https://vuejs.org/',
    badge:
      'https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white',
    description: t('about.stack_technologies.vuejs.description'),
  },
  {
    name: t('about.stack_technologies.typescript.name'),
    link: 'https://www.typescriptlang.org/',
    badge:
      'https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue',
    description: t('about.stack_technologies.typescript.description'),
  },
  {
    name: t('about.stack_technologies.tailwind.name'),
    link: 'https://tailwindcss.com/',
    badge:
      'https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8',
    description: t('about.stack_technologies.tailwind.description'),
  },
  {
    name: t('about.stack_technologies.vitest.name'),
    link: 'https://vitest.dev/',
    badge:
      'https://img.shields.io/badge/Vitest-000000?style=for-the-badge&logo=vitest&logoColor=white',
    description: t('about.stack_technologies.vitest.description'),
  },
  {
    name: t('about.stack_technologies.playwright.name'),
    link: 'https://playwright.dev/',
    badge:
      'https://img.shields.io/badge/Playwright-2563EB?style=for-the-badge&logo=playwright&logoColor=white',
    description: t('about.stack_technologies.playwright.description'),
  },
]
</script>

<template>
  <div class="mx-auto">
    <div class="flex flex-col">
      <p class="mb-4">
        {{ t('about.about_project_description') }}
      </p>

      <hr class="border-white/50" />
      <div class="gap-2">
        <h4 class="font-semibold">{{ t('about.technology_stack') }}</h4>
        <ul class="flex flex-col gap-4">
          <li v-for="tech in stackTechnologies" :key="tech.name" class="flex flex-col">
            <a :href="tech.link" target="_blank" class="inline-flex items-center max-w-max">
              <img :src="tech.badge" :alt="tech.name" class="inline-block" />
            </a>

            <p>{{ tech.description }}</p>
          </li>
        </ul>
      </div>
    </div>
    <hr class="border-white/50" />

    <div class="flex items-center gap-2 mt-4">
      <a href="https://github.com/wotanCode" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path
            d="M12 0C5.373 0 0 5.373 0 12c0 5.308 3.438 9.798 8.207 11.391.6.11.82-.261.82-.582v-2.17c-3.338.728-4.038-1.606-4.038-1.606-.546-1.38-1.334-1.748-1.334-1.748-1.091-.745.083-.73.083-.73 1.205.084 1.839 1.24 1.839 1.24 1.07 1.832 2.804 1.3 3.486.997.108-.774.42-1.3.764-1.6-2.668-.304-5.467-1.34-5.467-5.967 0-1.32.468-2.4 1.236-3.24-.124-.303-.536-1.527.118-3.175 0 0 1.019-.32 3.35 1.3A11.973 11.973 0 0 1 12 4.773a11.98 11.98 0 0 1 3.154.425c2.33-1.62 3.35-1.3 3.35-1.3.654 1.648.242 2.872.118 3.175.77.84 1.236 1.92 1.236 3.24 0 4.633-2.8 5.663-5.467 5.967.344.3.64.84.64 1.684v2.507c0 .323.22.694.83.582A11.97 11.97 0 0 0 24 12c0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
      <span>Pedro Yanez @2025 Casi todos los derechos reservados...</span>
    </div>
  </div>
</template>
