import type { InjectionKey } from 'vue'
import type { IVFormItemContext } from '@/shared/components/VForm/types'

export const VFormItemContextKey: InjectionKey<IVFormItemContext> = Symbol('VFormItemContextKey')
