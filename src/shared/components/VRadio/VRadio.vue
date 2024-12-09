<template>
  <div :class="classes" class="v-radio">
    <label class="v-radio__label">
      <input
        v-on="listeners"
        :value="value"
        :disabled="disabled"
        type="radio"
        class="v-radio__input"
        v-model="model"
      />
      <div class="v-radio__alter">&#10004;</div>
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { IVRadioModelValue, IVRadioProps } from '@/shared/components/VRadio/types'
import { computed, useAttrs, watch } from 'vue'
import { useListeners } from '@/shared/composables'

const props = defineProps<IVRadioProps>()
const model = defineModel<IVRadioModelValue>({ required: true })
const attrs = useAttrs()
const listeners = useListeners(attrs)

watch(model, () => {
  console.log(model.value)
})
const classes = computed(() => [
  {
    'v-radio--disabled': props.disabled,
    'v-radio--checked': props.value === model.value
  }
])
</script>

<style lang="scss" scoped>
.v-radio {
  color: var(--color-black);
  position: relative;
  overflow: hidden;

  &__label {
    display: flex;
    gap: 8px;
  }
  &__input {
    position: absolute;
    top: -20px;
  }
  &__alter {
    width: 20px;
    height: 20px;
    border: 1px solid var(--color-teal);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--checked {
    .v-radio__alter {
      background-color: var(--color-teal);
    }
  }

  &--disabled {
    .v-radio__input,
    .v-radio__label,
    .v-radio__alter {
      cursor: not-allowed;
    }

    .v-radio__label {
      color: var(--color-grey);
    }
  }
}
</style>
