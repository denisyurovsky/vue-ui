<template>
  <v-dropdown
    ref="dropdownRef"
    @open="emit('open')"
    @close="emit('close')"
    @opened="emit('opened', $event)"
    @closed="emit('opened', $event)"
  >
    <template #trigger="{ toggle }">
      <div @click="toggle" class="v-select__trigger">
        {{ titleOrValue }}
      </div>
    </template>
    <template #default>
      <div
        :key="option"
        @click="onOptionClick(option)"
        v-for="option in options"
        class="v-select__option"
      >
        {{ option }}
      </div>
    </template>
  </v-dropdown>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VSelectProps, VSelectEmits } from '@/shared/components/VSelect/types'
import VDropdown from '@/shared/components/VDropdown/VDropdown.vue'
import type { IVDropdownExpose } from '@/shared/components/VDropdown/types'

const props = defineProps<VSelectProps>()
const emit = defineEmits<VSelectEmits>()
const dropdownRef = ref<IVDropdownExpose>()

//TODO типы на основе пропсов
const model = defineModel<string | number | undefined | Array<string | number>>({
  required: true
})

const titleOrValue = computed(() => {
  if (!props.multiple) {
    return model.value || props.title
  } else {
    if (model.value.length) {
      return model.value.join(', ')
    } else {
      return props.title
    }
  }
})

function onOptionClick(option: string | number) {
  if (!props.multiple) {
    model.value = option
  } else {
    if (model.value.includes(option)) {
      model.value = model.value.filter((item) => item !== option)
    } else {
      model.value.push(option)
    }
  }

  if (!props.multiple) {
    dropdownRef.value?.setVisible(false)
  }
  emit('close')
}
</script>

<style scoped></style>
