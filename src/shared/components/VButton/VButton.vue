<template>
  <button class="v-button" :disabled="isDisabled">
    <slot name="before" />
    <slot />
    <slot name="after" />
    <span class="v-button__loader" v-if="isLoading"> loading... </span>
  </button>
</template>

<script setup lang="ts">
import type { IVButtonProps } from '@/shared/components/VButton/types'
import { computed } from 'vue'

const props = defineProps<IVButtonProps>()

const isDisabled = computed<boolean>(() => {
  return props.isLoading || props.disabled
})
</script>

<style lang="scss" scoped>
.v-button {
  position: relative;

  @include hover {
    color: red;
  }
  &:disabled {
    //styles for disabled
  }

  &__loader {
    position: absolute;
    right: 50%;
    color: var(--color-black);
  }
}
</style>
