import { type Ref, ref } from 'vue'

export type IUseToggle = [Ref<boolean>, (payload: boolean) => void, () => void]

export function useToggle(value: boolean = false): IUseToggle {
  const val = ref(value)

  function setVal(value: boolean) {
    val.value = value
  }

  function toggle() {
    val.value = !val.value
  }

  return [val, setVal, toggle]
}
