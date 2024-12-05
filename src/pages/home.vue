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
  <div>
    <v-radio-group name="test">
      <v-radio
        v-model="radioModel"
        v-for="option in radioOptions"
        :label="option.label"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      />
    </v-radio-group>
    radio model: {{ radioModel }}

    <v-radio-group name="test2" disabled>
      <v-radio
        v-model="radioModelDisabled"
        v-for="option in radioOptions"
        :value="option.value"
        :label="option.label"
        :key="option.value"
      />
    </v-radio-group>
    this is fully disabled radio group
  </div>
</template>

<script setup lang="ts">
import { VButton, VInput, VCheckbox, VRadioGroup, VRadio } from '@/shared/components'
import { useToggle } from '@/shared/composables'
import { ref } from 'vue'
import type { IVRadioOptions } from '@/shared/components/VRadio/types'

const [disabled, _, toggle] = useToggle()
const [disabled2, _2, toggle2] = useToggle()

const inputModel = ref('')
const checkboxModel = ref(false)

const radioModel = ref()
const radioModelDisabled = ref()

const radioOptions: IVRadioOptions[] = [
  {
    value: 1,
    label: 'первый',
    disabled: true
  },
  {
    value: 2,
    label: 'второй'
  },
  {
    value: 3,
    label: 'третий'
  }
]

defineOptions({
  name: 'homePage'
})
</script>

<style scoped></style>
