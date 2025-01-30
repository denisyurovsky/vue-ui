<template>
  <div v-click-outside="hide" class="v-dropdown">
    <slot
      name="trigger"
      :is-visible="isVisible"
      :toggle="toggleVisible"
      :set-visible="setVisible"
    />

    <transition name="fade-in-up" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
      <div v-show="isVisible" class="v-dropdown__menu">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useToggle } from '@/shared/composables'
import { vClickOutside } from '@/shared/directives/vClickOutside'
import type { IVDropdownEmits, IVDropdownExpose } from '@/shared/components/VDropdown/types'

const emit = defineEmits<IVDropdownEmits>()

const hide = () => setVisible(false)

function onAfterEnter(payload: Element) {
  emit('opened', payload)
}

function onAfterLeave(payload: Element) {
  emit('opened', payload)
}

const [isVisible, setVisible, toggleVisible] = useToggle()

watch(isVisible, (value) => {
  if (value) {
    emit('open')
  } else {
    emit('close')
  }
})

defineExpose<IVDropdownExpose>({
  setVisible,
  isVisible
})
</script>

<style scoped>
.v-dropdown {
  position: relative;
  cursor: pointer;
  &__menu {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid var(--color-teal);
    cursor: pointer;
  }
}
</style>
