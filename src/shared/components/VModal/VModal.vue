<template>
  <v-backdrop v-model="modelValue">
    <div class="v-modal">
      <div class="v-modal__header">
        <div @click="modelValue = false" class="v-modal__close">&#x2717;</div>
        <slot name="header" />
      </div>
      <div class="v-modal__body">
        <slot name="body" />
      </div>
    </div>
  </v-backdrop>
</template>

<script lang="ts" setup>
import VBackdrop from '@/shared/components/VModal/VBackdrop.vue'
const modelValue = defineModel<boolean>({
  required: true
})
</script>

<style lang="scss" scoped>
.v-modal {
  position: absolute;
  padding: 20px;
  background-color: var(--color-white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;

  &__header {
    position: relative;
  }
  &__close {
    position: absolute;
    top: -15px;
    right: -15px;
    cursor: pointer;
  }
}
</style>
