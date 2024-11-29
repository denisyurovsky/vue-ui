export const vClickOutside = {
  mounted(element, bind) {
    element.clickOutside = (event) => {
      if (event.target instanceof Element) {
        if (!(element === event.target || element.contains(event.target))) {
          bind.value(event, element)
        }
      }
    }

    window.addEventListener('click', element.clickOutside)
  },
  unmounted(element) {
    window.removeEventListener('click', element.clickOutside)
  }
}
