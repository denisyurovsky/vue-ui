import type { IVConfirmProps } from '@/shared/components/VConfirm/types'
import VConfirm from '@/shared/components/VConfirm/VConfirm.vue'
import { createVNode, render } from 'vue'

export async function useConfirm(props: IVConfirmProps) {
  return new Promise((resolve) => {
    const { body } = document

    const VConfirmVNode = createVNode(VConfirm, props)

    VConfirmVNode.props!.onSuccess = () => {
      render(null, body)

      return resolve(true)
    }

    VConfirmVNode.props!.onCancel = () => {
      render(null, body)

      return resolve(false)
    }

    render(VConfirmVNode, body)
  })
}
