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
import type { VSelectProps } from '@/shared/components/VSelect/types'

defineProps<VSelectProps>()

const model = defineModel({
  required: true
})

function isSelected(value: string | number) {
  return value === model.value
}

function changeModel(event) {
  model.value = JSON.parse(event.target.value)
}
</script>

<style scoped></style>
