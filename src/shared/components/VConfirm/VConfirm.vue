<template>
  <v-backdrop v-model="isVisible">
    <div class="v-confirm">
      <div class="v-confirm__header">
        {{ title }}
      </div>
      <div class="v-confirm__body">
        {{ message }}
      </div>
      <v-button @click="emit('success')">Ок</v-button>
      <v-button @click="emit('cancel')">Отмена</v-button>
    </div>
  </v-backdrop>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToggle } from '@/shared/composables'
import VBackdrop from '@/shared/components/VModal/VBackdrop.vue'
import { type IVConfirmEmits, type IVConfirmProps } from './types'
import { VButton } from '@/shared/components'

defineProps<IVConfirmProps>()
const emit = defineEmits<IVConfirmEmits>()

const [isVisible, setVisible] = useToggle()

onMounted(() => {
  setVisible(true)
})
</script>

<style lang="scss" scoped>
.v-confirm {
  position: absolute;
  padding: 20px;
  background-color: var(--color-white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
}
</style>
