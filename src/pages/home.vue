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
    <v-form @submit.prevent="onFormSubmit" ref="form" :rules="rules" v-model="formModel">
      <v-form-item title="Name" prop="name">
        <v-input v-model="formModel.name" />
      </v-form-item>
      <v-form-item title="test" prop="test.innerTest">
        <v-input v-model="formModel.test.innerTest" />
      </v-form-item>
      <v-form-item prop="radio">
        <v-radio
          v-model="formModel.radio"
          v-for="option in radioOptions"
          :label="option.label"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        />
      </v-form-item>

      <v-form-item title="полиси" prop="checkbox">
        <v-checkbox v-model="formModel.checkbox" />
      </v-form-item>

      <v-button @click="onReset">reset</v-button>
      <v-button type="submit">submit</v-button>
    </v-form>
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
import { VButton, VInput, VCheckbox, VRadio, VForm, VFormItem } from '@/shared/components'
import { useCycleList, useToggle } from '@/shared/composables'
import { ref, useTemplateRef } from 'vue'
import type { IVRadioOptions } from '@/shared/components/VRadio/types'
import type { IVFormExpose } from '@/shared/components/VForm/types'

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

const form = useTemplateRef<IVFormExpose>('form')
const formModel = ref({
  name: 'test',
  checkbox: null,
  radio: null,
  test: {
    innerTest: ''
  }
})

const rules = ref({
  checkbox: {
    required: true,
    message: 'Поставьте галочку'
  },
  radio: {
    required: true,
    message: 'Выберите одно из значений'
  },
  name: [
    { required: true, message: 'Пожалуйста, укажите Ваше имя' },
    { min: 3, max: 5, message: 'Длина должна быть не меньше 3х и не больше 5 символов' }
  ],
  test: {
    innerTest: {
      required: true,
      message: 'Поле обязательно к заполнению'
    }
  }
})

async function onFormSubmit() {
  const res = await form.value?.validate()
  if (res) {
    let newValues = await fetch('http://127.0.0.1:3000/form', {
      method: 'POST',
      body: JSON.stringify(formModel.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    newValues = await newValues.json();
    formModel.value = newValues;
  }
}

function onReset() {
  form.value?.reset()
}
const cycleModel = ref(['', '', false])

const { state, next, prev, reset, index } = useCycleList([VInput, VInput, VCheckbox])

defineOptions({
  name: 'homePage'
})
</script>

<style scoped></style>
