<template>
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
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { VButton, VCheckbox, VForm, VFormItem, VInput, VRadio } from '@/shared/components'
import type { IVFormExpose } from '@/shared/components/VForm/types'
import type { IVRadioOptions } from '@/shared/components/VRadio/types'

const form = useTemplateRef<IVFormExpose>('form')

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
}

function onReset() {
  form.value?.reset()
}
</script>

<style lang="scss" scoped></style>
