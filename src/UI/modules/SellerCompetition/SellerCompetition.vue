<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { ArrowPathIcon } from '@heroicons/vue/24/solid'

import { useImageRaceStore } from '@/stores/useImageRaceStore'

import useImageSearch from '@/composables/useImageSearch'

import LoadingState from '@/UI/components/LoadingState/LoadingState.vue'
import BaseModal from '@/UI/components/BaseModal/BaseModal.vue'
import AlertBox from '@/UI/components/AlertBox/AlertBox.vue'
import { WINNER_IMAGE_POINTS } from '@/const/consts'

const { isLoading: imagesLoading } = useImageSearch()
const { t } = useI18n()
const imageRaceStore = useImageRaceStore()
const router = useRouter()

const { currentParticipants } = imageRaceStore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modalRef = ref<any>(null)
const selectedParticipantIndex = ref<number | null>(null)

const toggleImageHighlight = (participantIndex: number) => {
  const participant = currentParticipants[participantIndex]

  if (!participant) return

  selectedParticipantIndex.value = participantIndex

  modalRef.value.openModal()
}

const handleConfirm = () => {
  if (selectedParticipantIndex.value !== null && !imageRaceStore.winner) {
    const participant = currentParticipants[selectedParticipantIndex.value]
    participant.score += WINNER_IMAGE_POINTS
    router.back()
  }
}

const handleCancel = () => {
  selectedParticipantIndex.value = null
}
</script>

<template>
  <LoadingState v-if="imagesLoading" :icon="ArrowPathIcon" :message="t('sellers.loading')" />

  <div v-else-if="!currentParticipants.some((participant) => participant.image)">
    <AlertBox type="alert" :message="t('imageRace.notRaceAlert')" />
  </div>

  <div v-else class="w-full bg-[rgb(36,46,52)]/10 dark:bg-neutral-50/10 rounded-2xl shadow-xl p-8">
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(participant, index) in currentParticipants"
        :key="participant.seller.id"
        class="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
      >
        <img
          :src="participant.image?.urls.small"
          :alt="participant.image?.alt_description || ''"
          class="w-full h-48 rounded-md mb-2 object-cover cursor-pointer"
          :class="{
            'ring-4 ring-yellow-400 scale-105 transition-transform':
              selectedParticipantIndex === index,
          }"
          @click="toggleImageHighlight(index)"
        />
        <p class="text-center text-lg font-semibold text-gray-800 dark:text-white">
          {{ participant.seller.name }}
        </p>
      </div>
    </div>
  </div>

  <BaseModal
    ref="modalRef"
    :title="t('imageRace.confirmationModal.information')"
    :confirmText="t('imageRace.confirmationModal.accept')"
    :cancelText="t('imageRace.confirmationModal.cancel')"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>
