<template>
  <div
    :class="[
      {
        'v-input--focus': isFocus,
        'v-input--disabled': disabled
      }
    ]"
    class="v-input"
  >
    <slot class="v-input-before" name="before" />
    <div class="v-input__body">
      <div
        :class="[
          {
            'v-input-title--focus': isFocus
          }
        ]"
        v-if="shouldShowTitle"
        class="v-input-title"
      >
        {{ title }}
      </div>
      <input
        :type="type"
        v-on="inputListeners"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="model"
      />
    </div>
    <slot class="v-input-after" name="after" />
  </div>
</template>

<script setup lang="ts">
import type { IVInputEmits, IVInputProps } from '@/shared/components/VInput/types'
import { useListeners, useToggle } from '@/shared/composables'
import { computed, useAttrs } from 'vue'

const props = withDefaults(defineProps<IVInputProps>(), {
  type: 'text'
})

const emit = defineEmits<IVInputEmits>()

const [isFocus, setFocus] = useToggle()

const model = defineModel()

const attrs = useAttrs()
const listeners = useListeners(attrs)

const shouldShowTitle = computed(() => {
  return props.title && !props.placeholder
})

const inputListeners = computed(() => {
  return {
    ...listeners,
    focusin: (event: Event) => {
      setFocus(true)

      emit('focusin', event)
    },
    focusout: (event: Event) => {
      setFocus(false)

      emit('focusout', event)
    }
  }
})
</script>

<style lang="scss" scoped>
.v-input {
  padding: 12px;
  width: fit-content;
  border: 2px solid black;
  display: flex;
  align-items: center;

  &--focus {
    border-color: green;
  }

  &--disabled {
    cursor: not-allowed;

    & input {
      cursor: not-allowed;
    }
  }
  & input {
    outline: none;
    border: none;
    font-size: 14px;
  }

  &-title {
    color: grey;
    position: absolute;
    top: 20%;
    left: 4%;
    font-size: 14px;
    background-color: #fff;
    transition: all 0.1s ease-in;
    padding: 0 2px;

    &--focus {
      top: -100%;
    }
  }

  &__body {
    display: flex;
    align-items: center;
    position: relative;
  }
}
</style>
