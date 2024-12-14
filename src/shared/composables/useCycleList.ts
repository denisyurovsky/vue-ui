import { ref, computed } from 'vue'
export function useCycleList(values: Array<any>, initialIndex = 0) {
  const currentIndex = ref(initialIndex)

  const state = computed(() => {
    return values[currentIndex.value]
  })

  function next() {
    const index = currentIndex.value + 1
    if (values.length - 1 < index) {
      currentIndex.value = 0

      return
    }
    currentIndex.value = index
  }

  function prev() {
    let index = currentIndex.value - 1

    if (index < 0) {
      index = values.length - 1
    }
    currentIndex.value = index
  }

  function reset() {
    currentIndex.value = 0
  }
  return {
    next,
    prev,
    reset,
    state,
    index: currentIndex
  }
}
