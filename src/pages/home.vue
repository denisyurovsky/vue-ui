<template>
  <div>
    <v-button :disabled="disabled">
      <template #before> hi im before slot </template>
      hello
      <template #after> hi im after slot </template>
    </v-button>

    <v-button @click="toggle">disable</v-button>
  </div>
  <div>
    <v-input
      placeholder="placeholder"
      title="helo title"
      v-model="inputModel"
      :disabled="disabled2"
    >
      <template #before>before</template>
    </v-input>
    <v-button @click="toggle2">disable input</v-button>
  </div>
  <div>
    <v-checkbox v-model="checkboxModel" />
    <v-checkbox disabled />
    checkbox: {{ checkboxModel }}
  </div>
</template>

<script setup lang="ts">
import { VButton, VInput, VCheckbox } from '@/shared/components'
import { useToggle } from '@/shared/composables'
import { ref } from 'vue'
const [disabled, _, toggle] = useToggle()
const [disabled2, _2, toggle2] = useToggle()

const inputModel = ref('')
const checkboxModel = ref(false)

defineOptions({
  name: 'homePage'
})
</script>

<style scoped></style>
