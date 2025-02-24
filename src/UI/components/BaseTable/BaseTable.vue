<script setup lang="ts">
export interface Column {
  header: string
  key: string
  slot?: string
}

interface BaseTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  columns: Column[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClick?: ((item: any) => void) | null
}

const props = defineProps<BaseTableProps>()
</script>

<template>
  <table v-if="props.data.length > 0" class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          v-for="column in props.columns"
          :key="column.key"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {{ column.header }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr
        v-for="(item, index) in props.data"
        :key="item.id || index"
        :class="[
          'odd:bg-gray-100',
          'even:bg-gray-200',
          'text-gray-900',
          props.rowClick ? 'cursor-pointer' : '',
        ]"
        @click="props.rowClick && props.rowClick(item)"
      >
        <td v-for="column in props.columns" :key="column.key" class="px-6 py-4 whitespace-nowrap">
          <template v-if="column.slot">
            <slot :name="column.slot" :item="item"></slot>
          </template>
          <template v-else>
            {{ item[column.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
