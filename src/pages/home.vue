<template>
  <div>
    <v-button :disabled="disabled">
      <template #before> hi im before slot </template>
      hello
      <template #after> hi im after slot </template>
    </v-button>

    <v-button @click="toggle">disable</v-button>
    <v-input autofocus />
  </div>
</template>

<script setup lang="ts">
import { VButton, VInput } from '@/shared/components'
import { useToggle } from '@/shared/composables'

const [disabled, _, toggle] = useToggle()

defineOptions({
  name: 'homePage'
})
</script>

<style scoped></style>
