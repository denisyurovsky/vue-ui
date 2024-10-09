<template>
  <div>
    <v-button>
      <template #before> hi im before slot </template>
      hello
      <template #after> hi im after slot </template>
    </v-button>
  </div>
</template>

<script setup lang="ts">
import { VButton } from '@/shared/components'

defineOptions({
  name: 'homePage'
})
</script>

<style scoped></style>
