<template>
  <select @change="changeModel">
    <option selected disabled hidden>{{ placeholder }}</option>
    <option
      :selected="isSelected(option)"
      v-for="option in options"
      :key="option"
      :value="JSON.stringify(option)"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { VSelectEmits, VSelectProps } from '@/shared/components/VSelect/types'

defineProps<VSelectProps>()
const emit = defineEmits<VSelectEmits>()

const model = defineModel()

function isSelected(value: string | number) {
  return value === model.value
}

function changeModel(event) {
  model.value = event.target.value
  emit('change', event.target.value)
}
</script>

<style scoped></style>
