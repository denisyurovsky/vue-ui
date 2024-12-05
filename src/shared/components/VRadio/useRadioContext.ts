import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export interface IVRadioContext {
  name: string
  disabled?: boolean
}
export const VRadioKey: InjectionKey<IVRadioContext> = Symbol('VRadioKey')

export const useRadioContext = () => inject(VRadioKey)
