<template>
  <button :type="type" class="v-button" :disabled="isDisabled" v-bind="listeners">
    <slot name="before" />
    <slot />
    <slot name="after" />
    <span class="v-button__loader" v-if="isLoading"> loading... </span>
  </button>
</template>

<script setup lang="ts">
import type { IVButtonProps } from '@/shared/components/VButton/types'
import { computed, useAttrs } from 'vue'
import { useListeners } from '@/shared/composables'

const props = defineProps<IVButtonProps>()
const attrs = useAttrs()
const listeners = useListeners(attrs)

//не прокидывает в корень
defineOptions({
  inheritAttrs: false
})

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
    cursor: not-allowed;
    //styles for disabled
  }

  &__loader {
    position: absolute;
    right: 50%;
    color: var(--color-black);
  }
}
</style>
