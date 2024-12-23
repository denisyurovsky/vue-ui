<template>
  <teleport to="body">
    <div v-if="modelValue" class="v-backdrop">
      <slot />
    </div>
  </teleport>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>({
  required: true
})
</script>

<style lang="scss" scoped>
.v-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
</style>
