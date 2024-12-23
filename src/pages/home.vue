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
    <v-radio
      v-model="radioModel"
      v-for="option in radioOptions"
      :label="option.label"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    />
    radio model: {{ radioModel }}

    <v-radio
      v-model="radioModelDisabled"
      v-for="option in radioOptions"
      :value="option.value"
      :label="option.label"
      :key="option.value"
      disabled
    />
    this is fully disabled radio group
  </div>

  <div>
    useCycleList

    <component v-model="cycleModel[index]" :is="state" />

    <v-button @click="prev">prev</v-button>
    <v-button @click="next">next</v-button>
    <v-button @click="reset">reset</v-button>
  </div>
</template>

<script setup lang="ts">
import { VButton, VInput, VCheckbox, VRadio } from '@/shared/components'
import type { IVRadioOptions } from '@/shared/components/VRadio/types'
import { useCycleList, useToggle } from '@/shared/composables'
import { ref } from 'vue'
const [disabled, , toggle] = useToggle()
const [disabled2, , toggle2] = useToggle()

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

const cycleModel = ref(['', '', false])

const { state, next, prev, reset, index } = useCycleList([VInput, VInput, VCheckbox])

defineOptions({
  name: 'homePage'
})
</script>

<style scoped></style>
