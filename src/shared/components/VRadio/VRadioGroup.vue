<template>
  <div class="v-radio-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { IVRadioGroupProps } from '@/shared/components/VRadio/types'
import { VRadioKey } from '@/shared/components/VRadio/useRadioContext'
import { provide } from 'vue'

const props = defineProps<IVRadioGroupProps>()

provide(VRadioKey, {
  name: props.name,
  disabled: props.disabled
})
</script>

<style scoped></style>
